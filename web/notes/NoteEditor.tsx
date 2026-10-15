import { Placeholder } from '@tiptap/extensions';
import { Markdown } from '@tiptap/markdown';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { type SaveStatus, useAutosave } from './useAutosave';

const PLACEHOLDER = 'Энд бичиж эхлээрэй…  # гарчиг · - жагсаалт · **тод** · ``` код';

interface Props {
  docId: string;
  label?: string;
  legacyFrom?: string;
}

/** Notion-style Markdown note: borderless WYSIWYG, auto-saved to study_documents[docId]. */
export function NoteEditor({ docId, label = 'Миний тэмдэглэл', legacyFrom }: Props) {
  const note = useAutosave(docId, legacyFrom);
  return (
    <section className="note" aria-label={label}>
      <header className="note-head">
        <h2>{label}</h2>
        <StatusPill status={note.status} />
      </header>
      {note.loadError ? (
        <p className="note-error">Тэмдэглэл ачаалсангүй. Хуудсыг дахин ачаална уу.</p>
      ) : note.initial === undefined ? (
        <p className="note-loading" aria-busy="true" />
      ) : (
        <Editor initial={note.initial} onChange={note.schedule} onBlur={note.flush} />
      )}
    </section>
  );
}

// Mounted only after the note has loaded, so the editor is created with its real content.
function Editor({
  initial,
  onChange,
  onBlur,
}: {
  initial: string;
  onChange: (md: string) => void;
  onBlur: () => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: PLACEHOLDER }), Markdown],
    content: initial,
    contentType: 'markdown',
    editorProps: { attributes: { class: 'note-body', spellcheck: 'false' } },
    onUpdate: ({ editor }) => onChange(editor.getMarkdown()),
    onBlur: () => onBlur(),
  });
  return <EditorContent editor={editor} />;
}

const labels: Partial<Record<SaveStatus, string>> = {
  dirty: 'Засаж байна…',
  saving: 'Хадгалж байна…',
  saved: 'Хадгалсан ✓',
  error: 'Хадгалж чадсангүй — дараагийн засвараар дахин оролдоно',
};

function StatusPill({ status }: { status: SaveStatus }) {
  // "Saved" fades out after 2s; errors stay until the next successful save.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(status !== 'idle');
    if (status !== 'saved') return;
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, [status]);
  return (
    <small role="status" className={`note-status ${status}${visible ? ' show' : ''}`}>
      {labels[status] ?? ''}
    </small>
  );
}
