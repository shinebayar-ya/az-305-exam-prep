import { Inline } from '../../content/Inline';
import type { Topic } from '../../content/schema';
import { Section } from './Section';

export function Mnemonics({ mnemonics }: { mnemonics: Topic['mnemonics'] }) {
  return (
    <Section id="mnemonics" title="Цээжлэх түлхүүр" tone="mnemonic">
      {mnemonics.map((m) => (
        <div className="t-mnemonic" key={m.device}>
          <p className="t-device">{m.device}</p>
          <ul className="t-parts">
            {m.parts.map((p) => (
              <li key={p.key}>
                <span className="t-letter">{p.key}</span>
                <span>
                  <Inline text={p.meaning} />
                </span>
              </li>
            ))}
          </ul>
          <p className="t-why">
            <Inline text={m.why} />
          </p>
        </div>
      ))}
    </Section>
  );
}
