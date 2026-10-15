import { BookOpen } from 'lucide-react';
import sourceData from '../../../materials/sources.json';
import type { Question } from '../../bank';

const sources: Record<string, { title: string; url: string }> = sourceData;
export function Explanation({ q }: { q: Question }) {
  return (
    <details open className="feedback rounded-xl border bg-muted/50 p-5 text-sm leading-7">
      <summary className="cursor-pointer font-medium">
        <BookOpen className="mr-2 inline size-4" />
        Шийдвэрийн тайлбар
      </summary>
      <div className="mt-4 space-y-4 wrap-anywhere">
        <p className="font-medium">
          Зөв: {String.fromCharCode(65 + q.answer)} · {q.options[q.answer]}
        </p>
        <p>{q.explanation}</p>
        {q.option_explanations && (
          <ul className="space-y-3">
            {q.option_explanations.map((text, i) => (
              <li key={text}>
                <b>{String.fromCharCode(65 + i)}.</b> {text}
              </li>
            ))}
          </ul>
        )}
        {q.tradeoffs && (
          <p>
            <b>Trade-offs:</b> {q.tradeoffs}
          </p>
        )}
        {q.vocabulary && (
          <details>
            <summary className="cursor-pointer font-medium">English үгс</summary>
            {q.vocabulary.map((v) => (
              <p key={v.en}>
                <b>{v.en}</b> — {v.mn}
              </p>
            ))}
          </details>
        )}
        <div className="space-y-2">
          {(q.sources ?? [q.source]).map((id) => (
            <p key={id}>
              <a
                className="underline underline-offset-4"
                href={sources[id].url}
                target="_blank"
                rel="noreferrer"
              >
                {sources[id].title} ↗
              </a>
            </p>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Эх сурвалж шалгасан: {q.checked}</p>
      </div>
    </details>
  );
}
