import sourceData from '../../../materials/sources.json';
import { Section } from './Section';

export const sourceById: Record<string, { title: string; url: string; checked?: string }> =
  sourceData;

export function Sources({ sources }: { sources: string[] }) {
  return (
    <Section id="sources" title="Эх сурвалж">
      <ul className="t-sources">
        {sources.map(
          (key) =>
            sourceById[key] && (
              <li key={key}>
                <a href={sourceById[key].url} target="_blank" rel="noreferrer">
                  {sourceById[key].title} ↗
                </a>
              </li>
            ),
        )}
      </ul>
    </Section>
  );
}
