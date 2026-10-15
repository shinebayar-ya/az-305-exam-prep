import { Check, CircleCheck, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import type { Question } from '../../bank';
import type { Quiz } from '../../useQuiz';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Explanation } from './Explanation';
export function QuizSummary({
  state,
  list,
  correct,
  busy,
  onRestart,
  text,
  options,
}: {
  state: Quiz;
  list: Question[];
  correct: number;
  busy: boolean;
  onRestart: () => void;
  text: (q: Question) => string;
  options: (q: Question) => string[];
}) {
  const [review, setReview] = useState<'all' | 'incorrect'>('all');
  return (
    <Card className="result border py-6 shadow-none ring-0">
      <CardContent className="space-y-6 px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <CircleCheck className="size-7" />
          <div>
            <h2 className="text-xl font-semibold">Багц дууслаа</h2>
            <p className="text-sm text-muted-foreground">
              Хариултуудаа эргэн харж, шийдвэрийн үндэслэлээ давтаарай.
            </p>
          </div>
        </div>
        <div className="flex items-baseline gap-3 border-b pb-6">
          <strong className="text-5xl font-medium tracking-tight">
            {Math.round((correct / list.length) * 100)}%
          </strong>
          <span className="text-muted-foreground">
            {correct} / {list.length} зөв хариулт
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Өндөр итгэлтэй буруу:{' '}
          {
            list.filter(
              (x) => state.confidence[x.id] === 'high' && state.answers[x.id] !== x.answer,
            ).length
          }
          . Орчуулга ашигласан асуулт:{' '}
          {state.translations.filter((id) => state.questionIds.includes(id)).length}.
        </p>
        <fieldset className="flex min-w-0 flex-wrap gap-2" aria-label="Хариулт давтах">
          <Button
            variant={review === 'all' ? 'secondary' : 'ghost'}
            aria-pressed={review === 'all'}
            onClick={() => setReview('all')}
          >
            Бүх хариулт
          </Button>
          <Button
            variant={review === 'incorrect' ? 'secondary' : 'ghost'}
            aria-pressed={review === 'incorrect'}
            onClick={() => setReview('incorrect')}
          >
            Буруу хариулт ({list.length - correct})
          </Button>
        </fieldset>
        <div className="review-list divide-y">
          {review === 'incorrect' && correct === list.length && <p>Бүх хариулт зөв байна.</p>}
          {list
            .filter((x) => review === 'all' || state.answers[x.id] !== x.answer)
            .map((x) => (
              <details key={x.id} className="py-3">
                <summary className="cursor-pointer text-sm leading-7">
                  <span
                    className={
                      state.answers[x.id] === x.answer ? 'text-success' : 'text-destructive'
                    }
                  >
                    {state.answers[x.id] === x.answer ? (
                      <Check className="mr-1 inline size-4" />
                    ) : (
                      <X className="mr-1 inline size-4" />
                    )}
                    {state.answers[x.id] === x.answer ? 'Зөв' : 'Буруу'}
                  </span>{' '}
                  · {x.id} · {text(x)}
                </summary>
                <p className="my-4 text-sm">Таны сонголт: {options(x)[state.answers[x.id]]}</p>
                <Explanation q={x} />
              </details>
            ))}
        </div>
        <Button disabled={busy} onClick={onRestart}>
          <RotateCcw /> Шинэ багц эхлэх
        </Button>
      </CardContent>
    </Card>
  );
}
