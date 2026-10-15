import { Inline } from '../../content/Inline';
import type { Topic } from '../../content/schema';
import { SectionIcon } from '../../icons/Icon';
import { Section } from './Section';

export function ExamTraps({ traps }: { traps: Topic['examTraps'] }) {
  return (
    <Section id="traps" title="Шалгалт таныг хэрхэн хуурах вэ" tone="trap">
      {traps.map((t) => (
        <div className="t-trap" key={t.trap}>
          <p>
            <span className="t-tag bad">Урхи</span>
            <Inline text={t.trap} />
          </p>
          <p>
            <span className="t-tag good">Үнэн</span>
            <Inline text={t.truth} />
          </p>
          <p className="t-phrase">
            <SectionIcon id="phrase" size={14} /> <em>“{t.phrase_en}”</em>
          </p>
        </div>
      ))}
    </Section>
  );
}
