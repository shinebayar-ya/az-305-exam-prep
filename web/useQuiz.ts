import { useEffect, useRef, useState } from 'react';
import { restoreQuiz, selectBatch } from './bank';
import { loadDocument, saveDocument } from './storage';
export interface Attempt {
  at: string;
  filter: string;
  correct: number;
  total: number;
  answers: Record<string, number>;
  questionIds?: string[];
  mode?: string;
  confidence?: Record<string, string>;
  translations?: string[];
}
export interface Quiz {
  answers: Record<string, number>;
  index: number;
  done: boolean;
  filter: string;
  history: Attempt[];
  questionIds: string[];
  mode: 'study' | 'exam';
  hard: boolean;
  language: 'en' | 'mn';
  confidence: Record<string, string>;
  translations: string[];
  seenIds: string[];
}
function initial(): Quiz {
  return {
    answers: {},
    index: 0,
    done: false,
    filter: 'all',
    history: [],
    questionIds: selectBatch('all', true),
    mode: 'study',
    hard: true,
    language: 'en',
    confidence: {},
    translations: [],
    seenIds: [],
  };
}
export function useQuiz() {
  const [state, setState] = useState<Quiz>(initial),
    [ready, setReady] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  const base = useRef(state);
  const lock = useRef(false);
  useEffect(() => {
    let active = true;
    loadDocument<Partial<Quiz>>('quiz')
      .then(async (value) => {
        if (active) {
          const loaded = restoreQuiz(value, base.current);
          if (!value) await saveDocument('quiz', loaded);
          if (active) {
            setState(loaded);
            setReady(true);
          }
        }
      })
      .catch(() => {
        if (active)
          setError('Дадлагыг ачаалж чадсангүй. Өгөгдлийг устгахгүйгээр хуудсыг дахин ачаална уу.');
      });
    return () => {
      active = false;
    };
  }, []);
  async function change(next: Quiz) {
    if (!ready || lock.current) return;
    lock.current = true;
    setBusy(true);
    setError('');
    try {
      await saveDocument('quiz', next);
      setState(next);
    } catch {
      setError('Хадгалж чадсангүй. Дахин оролдоно уу.');
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  function start(filter = state.filter, hard = state.hard, mode = state.mode) {
    const seen = [
      ...state.seenIds,
      ...state.history.flatMap((h) => Object.keys(h.answers)),
      ...Object.keys(state.answers),
    ];
    return change({
      ...state,
      filter,
      hard,
      mode,
      answers: {},
      index: 0,
      done: false,
      questionIds: selectBatch(filter, hard, seen),
      confidence: {},
      translations: [],
    });
  }
  return { state, ready, busy, error, change, start };
}
