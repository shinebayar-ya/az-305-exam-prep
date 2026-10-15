import { Fragment, type ReactNode } from 'react';

// Tiny, safe renderer for content strings: **bold**, *italic*, `code` and blank-line paragraphs.
// Builds React nodes (no innerHTML), so content JSON can never inject markup.
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: tokens of an immutable string; position is the identity and may repeat.
        <Fragment key={i}>{format(part)}</Fragment>
      ))}
    </>
  );
}

function format(part: string): ReactNode {
  if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
    return <strong>{part.slice(2, -2)}</strong>;
  if (part.startsWith('`') && part.endsWith('`') && part.length > 2)
    return <code>{part.slice(1, -1)}</code>;
  if (part.startsWith('*') && part.endsWith('*') && part.length > 2)
    return <em>{part.slice(1, -1)}</em>;
  return part;
}

export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((p, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs of an immutable string; position is the identity.
        <p key={i}>
          <Inline text={p} />
        </p>
      ))}
    </>
  );
}
