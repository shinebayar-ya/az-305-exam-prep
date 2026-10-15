import { Paragraphs } from '../../content/Inline';
import type { Topic } from '../../content/schema';
import { Section } from './Section';

export function Analogy({ analogy }: { analogy: Topic['analogy'] }) {
  return (
    <Section id="analogy" title={analogy.title} tone="story">
      <Paragraphs text={analogy.story} />
      <div className="t-map">
        {analogy.mapping.map((m) => (
          <div className="t-map-row" key={m.real}>
            <span>{m.real}</span>
            <span aria-hidden="true">→</span>
            <strong>{m.azure}</strong>
          </div>
        ))}
      </div>
    </Section>
  );
}
