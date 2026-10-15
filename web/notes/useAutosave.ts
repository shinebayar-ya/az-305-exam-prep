import { useCallback, useEffect, useRef, useState } from 'react';
import { loadDocument, saveDocument } from '../storage';

export type SaveStatus = 'idle' | 'dirty' | 'saving' | 'saved' | 'error';

const DEBOUNCE_MS = 800;
const RETRY_MS = 600;

/** Old notes were plain textarea text: keep their line breaks as Markdown paragraphs. */
const fromPlainText = (text: string) => text.replace(/\r\n/g, '\n').replace(/\n(?!\n)/g, '\n\n');

/**
 * Loads a Markdown string from study_documents and saves edits back with a debounce.
 * Writes are chained on one promise so an older value can never overwrite a newer one,
 * and pending edits are flushed on blur (caller), tab hide, page unload and unmount.
 */
export function useAutosave(docId: string, legacyFrom?: string) {
  const [initial, setInitial] = useState<string>();
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const lastSaved = useRef('');
  const pending = useRef<string | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const chain = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    (async () => {
      const saved = await loadDocument<string>(docId);
      if (saved !== undefined) return { value: saved, persisted: saved };
      // First open of an old textarea note: show it converted, write only after an edit.
      const old = legacyFrom ? await loadDocument<string>(legacyFrom) : undefined;
      return { value: old ? fromPlainText(old) : '', persisted: '' };
    })()
      .then(({ value, persisted }) => {
        if (active) {
          lastSaved.current = persisted;
          setInitial(value);
        }
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, [docId, legacyFrom]);

  const write = useCallback(
    (value: string) => {
      chain.current = chain.current.then(async () => {
        if (value === lastSaved.current) {
          setStatus((s) => (s === 'dirty' ? 'idle' : s));
          return;
        }
        setStatus('saving');
        try {
          await saveDocument(docId, value).catch(async () => {
            // One quiet retry covers a busy worker; a second failure is reported.
            await new Promise((r) => setTimeout(r, RETRY_MS));
            await saveDocument(docId, value);
          });
          lastSaved.current = value;
          // A newer edit may have been scheduled while this write was in flight.
          setStatus(pending.current === undefined ? 'saved' : 'dirty');
        } catch {
          pending.current ??= value; // keep it so the next flush tries again
          setStatus('error');
        }
      });
      return chain.current;
    },
    [docId],
  );

  const flush = useCallback(() => {
    clearTimeout(timer.current);
    const value = pending.current;
    pending.current = undefined;
    return value === undefined ? chain.current : write(value);
  }, [write]);

  const schedule = useCallback(
    (value: string) => {
      pending.current = value;
      setStatus('dirty');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), DEBOUNCE_MS);
    },
    [flush],
  );

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') void flush();
    };
    const onUnload = () => void flush();
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onUnload);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onUnload);
      void flush(); // switching tabs/topics unmounts the editor
    };
  }, [flush]);

  return { initial, loadError, status, schedule, flush };
}
