import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Topic } from '../content/schema';
import { SectionIcon } from '../icons/Icon';
import type { SectionIconId } from '../icons/registry';
import { NoteEditor } from '../notes/NoteEditor';
import { Analogy } from './sections/Analogy';
import { CompareTable } from './sections/CompareTable';
import { ExamTraps } from './sections/ExamTraps';
import { Hero } from './sections/Hero';
import { Illustration } from './sections/Illustration';
import { KeyFacts } from './sections/KeyFacts';
import { Mnemonics } from './sections/Mnemonics';
import { PracticeLinks } from './sections/PracticeLinks';
import { Sources } from './sections/Sources';
import { Vocabulary } from './sections/Vocabulary';

export function TopicDetail({ topic }: { topic: Topic }) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: topic.id is the trigger — scroll to top on each topic change.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [topic.id]);
  const toc: [SectionIconId, string][] = [
    ['analogy', 'Зүйрлэл'],
    ['mnemonics', 'Цээжлэх'],
    ['facts', 'Баримт'],
    ...(topic.compare ? [['compare', 'Харьцуулалт'] as [SectionIconId, string]] : []),
    ['traps', 'Урхи'],
    ['practice', 'Дадлага'],
    ['notes', 'Тэмдэглэл'],
  ];
  // Buttons, not #anchors: the URL hash is the topic route.
  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="t-layout">
      <article className="t-detail">
        <Link className="t-back" to="/topics">
          <ArrowLeft size={16} /> Бүх сэдэв
        </Link>
        <Hero topic={topic} />
        <Analogy analogy={topic.analogy} />
        <Illustration illustration={topic.illustration} />
        <Mnemonics mnemonics={topic.mnemonics} />
        <KeyFacts facts={topic.keyFacts} />
        {topic.compare && <CompareTable compare={topic.compare} />}
        <ExamTraps traps={topic.examTraps} />
        {topic.vocabulary?.length ? <Vocabulary words={topic.vocabulary} /> : null}
        <PracticeLinks sources={topic.sources} />
        <Sources sources={topic.sources} />
        <div id="notes">
          <NoteEditor key={topic.id} docId={`topic:${topic.id}`} />
        </div>
      </article>
      <nav className="t-toc" aria-label="Энэ хуудсанд">
        {toc.map(([id, label]) => (
          <button key={id} type="button" onClick={() => jump(id)}>
            <SectionIcon id={id} size={14} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
