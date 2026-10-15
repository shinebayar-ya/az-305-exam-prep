import { Inline } from '../../content/Inline';
import type { Topic } from '../../content/schema';
import { Section } from './Section';
import { sourceById } from './Sources';

export function KeyFacts({ facts }: { facts: Topic['keyFacts'] }) {
  return (
    <Section id="facts" title="Гол баримтууд">
      <ul className="t-facts">
        {facts.map((f) => (
          <li key={f.text}>
            <Inline text={f.text} />{' '}
            <a className="t-cite" href={sourceById[f.source]?.url} target="_blank" rel="noreferrer">
              {sourceById[f.source]?.title ?? f.source} ↗
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
