import { bank, type Question } from '../../bank';
import { Section } from './Section';

const VISIBLE = 5;
const item = (q: Question) => (
  <details key={q.id}>
    <summary>
      <span className="question-id">{q.id}</span> {q.prompt_en ?? q.prompt}
    </summary>
    <p>{q.explanation}</p>
  </details>
);

/** Questions from the existing bank whose `source` matches this topic's sources. */
export function PracticeLinks({ sources }: { sources: string[] }) {
  const related = bank.filter((q) => sources.includes(q.source));
  if (!related.length) return null;
  return (
    <Section id="practice" title={`Холбоотой дадлага (${related.length})`}>
      <div className="t-questions">
        {related.slice(0, VISIBLE).map(item)}
        {related.length > VISIBLE && (
          <details className="t-more">
            <summary>Бүгдийг харах (+{related.length - VISIBLE})</summary>
            {related.slice(VISIBLE).map(item)}
          </details>
        )}
      </div>
    </Section>
  );
}
