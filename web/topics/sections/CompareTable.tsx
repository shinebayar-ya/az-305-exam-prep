import { Inline } from '../../content/Inline';
import type { Topic } from '../../content/schema';
import { Section } from './Section';

export function CompareTable({ compare }: { compare: NonNullable<Topic['compare']> }) {
  return (
    <Section id="compare" title="Харьцуулалт">
      <div className="t-table-wrap">
        <table className="t-table">
          {compare.caption && <caption>{compare.caption}</caption>}
          <thead>
            <tr>
              {compare.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((r) => (
              <tr key={r[0]}>
                {r.map((cell, i) =>
                  i === 0 ? (
                    <th key={compare.columns[i]} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={compare.columns[i]}>
                      <Inline text={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
