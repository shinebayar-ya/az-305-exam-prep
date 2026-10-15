import type { Topic } from '../../content/schema';
import { Section } from './Section';

export function Vocabulary({ words }: { words: NonNullable<Topic['vocabulary']> }) {
  return (
    <Section id="vocabulary" title="Шалгалтын English">
      <dl className="t-vocab">
        {words.map((w) => (
          <div key={w.en}>
            <dt>{w.en}</dt>
            <dd>{w.mn}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
