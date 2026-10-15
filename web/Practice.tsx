import { ArrowLeft, ArrowRight, Bookmark, Check, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { byId, type Question } from './bank';
import { AnswerCard, type AnswerState } from './components/quiz/AnswerCard';
import { Explanation } from './components/quiz/Explanation';
import { QuizSummary } from './components/quiz/QuizSummary';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { NativeSelect } from './components/ui/native-select';
import { useQuiz } from './useQuiz';

const domains: Record<string, string> = {
  identity: 'Identity & governance',
  data: 'Data storage',
  continuity: 'Business continuity',
  infrastructure: 'Infrastructure',
};
const letter = (i: number) => String.fromCharCode(65 + i);
const confidenceLevels: [string, string][] = [
  ['low', 'Бага'],
  ['medium', 'Дунд'],
  ['high', 'Өндөр'],
];
const BOOKMARKS_KEY = 'practice:bookmarks';
const loadBookmarks = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) ?? '[]');
  } catch {
    return [];
  }
};
export function Practice() {
  const { state, change, start, ready, busy, error } = useQuiz();
  const [selection, setSelection] = useState<number>();
  const [confidence, setConfidence] = useState('medium');
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const previousIndex = useRef(state.index);
  useEffect(() => {
    if (previousIndex.current !== state.index) {
      questionHeading.current?.focus();
      previousIndex.current = state.index;
    }
  }, [state.index]);
  const [bookmarks, setBookmarks] = useState<string[]>(loadBookmarks);
  const { answers, index, done, filter, history, language, mode, hard } = state;
  // Keep the selected topic/difficulty batch stable across unrelated UI renders.
  const list = useMemo(() => state.questionIds.map((id) => byId[id]), [state.questionIds]);
  const q = list[index];
  const { answered, correct } = useMemo(
    () => ({
      answered: list.filter((x) => answers[x.id] !== undefined).length,
      correct: list.filter((x) => answers[x.id] === x.answer).length,
    }),
    [list, answers],
  );
  const text = (x: Question) => (language === 'en' && x.prompt_en ? x.prompt_en : x.prompt);
  const options = (x: Question) => (language === 'en' && x.options_en ? x.options_en : x.options);
  async function newBatch(f = filter, h = hard, m = mode) {
    await start(f, h, m);
    setSelection(undefined);
  }
  async function next() {
    if (index === list.length - 1) {
      await change({
        ...state,
        done: true,
        history: [
          {
            at: new Date().toISOString(),
            filter,
            correct,
            total: list.length,
            answers: { ...answers },
            questionIds: [...state.questionIds],
            mode,
            confidence: state.confidence,
            translations: state.translations,
          },
          ...history,
        ],
      });
    } else {
      await change({ ...state, index: index + 1 });
      setSelection(undefined);
    }
  }
  async function previous() {
    if (index === 0) return;
    await change({ ...state, index: index - 1 });
    setSelection(undefined);
  }
  async function answer() {
    if (selection === undefined) return;
    await change({
      ...state,
      answers: { ...answers, [q.id]: selection },
      confidence: { ...state.confidence, [q.id]: confidence },
      seenIds: Array.from(new Set([...state.seenIds, q.id])),
      translations:
        language === 'mn' ? Array.from(new Set([...state.translations, q.id])) : state.translations,
    });
  }
  const toggleBookmark = (id: string) => {
    const nextList = bookmarks.includes(id)
      ? bookmarks.filter((x) => x !== id)
      : [...bookmarks, id];
    setBookmarks(nextList);
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(nextList));
    } catch {
      /* storage unavailable: bookmark lasts for this session only */
    }
  };
  const picked = q ? answers[q.id] : undefined,
    locked = picked !== undefined;

  // Keyboard: 1-4 / A-D pick an option, Enter confirms the pick, then moves to the next question.
  const keys = useRef({
    q,
    done,
    busy,
    ready,
    selection,
    locked,
    answer,
    next,
    previous,
    index,
    optionCount: q?.options.length ?? 0,
  });
  keys.current = {
    q,
    done,
    busy,
    ready,
    selection,
    locked,
    answer,
    next,
    previous,
    index,
    optionCount: q?.options.length ?? 0,
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = keys.current;
      if (e.repeat || !k.ready || k.done || k.busy || !k.q || e.metaKey || e.ctrlKey || e.altKey)
        return;
      const el = e.target as HTMLElement;
      if (el.closest('input[type=text],textarea,select,[contenteditable=true]')) return;
      if (!el.closest('input') && e.key === 'ArrowLeft' && k.index > 0) {
        e.preventDefault();
        void k.previous();
        return;
      }
      if (!el.closest('input') && e.key === 'ArrowRight' && k.locked) {
        e.preventDefault();
        void k.next();
        return;
      }
      if (e.key === 'Enter') {
        if (el.closest('button,a,summary')) return; // native activation handles it
        e.preventDefault();
        if (k.locked) void k.next();
        else if (k.selection !== undefined) void k.answer();
        return;
      }
      if (k.locked) return;
      const n = /^[1-9]$/.test(e.key)
        ? Number(e.key) - 1
        : /^[a-z]$/i.test(e.key)
          ? e.key.toUpperCase().charCodeAt(0) - 65
          : -1;
      if (n >= 0 && n < k.optionCount) {
        e.preventDefault();
        setSelection(n);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const reveal = mode === 'study';
  const segmentState = (x: Question, i: number) => {
    if (answers[x.id] === undefined) return i === index ? 'current' : '';
    return reveal ? (answers[x.id] === x.answer ? 'right' : 'wrong') : 'done';
  };
  const chosen = picked ?? selection;
  const optionState = (i: number): AnswerState => {
    if (locked && reveal) {
      if (i === q.answer) return 'right';
      if (i === picked) return 'wrong';
      return 'muted';
    }
    return chosen === i ? 'chosen' : '';
  };
  const saved = q && bookmarks.includes(q.id);
  return (
    <section className="practice space-y-7">
      <div className="space-y-2">
        <p className="text-[11px] font-medium tracking-[.16em] text-muted-foreground">
          AZ-305 PREPARATION
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Архитектурын дадлага</h1>
        <p className="text-sm text-muted-foreground">
          Шаардлагыг унш. Сонголтоо хий. Шийдвэрээ ойлго.
        </p>
      </div>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <fieldset className="flex min-w-0 flex-wrap gap-2" aria-label="Багцын тохиргоо">
          <NativeSelect
            aria-label="Сэдэв"
            disabled={!ready || busy}
            value={filter}
            onChange={(e) => void newBatch(e.target.value)}
          >
            <option value="all">Бүх сэдэв</option>
            {Object.entries(domains).map(([id, title]) => (
              <option value={id} key={id}>
                {title}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect
            aria-label="Түвшин"
            disabled={!ready || busy}
            value={hard ? 'hard' : 'all'}
            onChange={(e) => void newBatch(filter, e.target.value === 'hard')}
          >
            <option value="hard">Hard</option>
            <option value="all">Бүх түвшин</option>
          </NativeSelect>
          <NativeSelect
            aria-label="Горим"
            disabled={!ready || busy}
            value={mode}
            onChange={(e) => void newBatch(filter, hard, e.target.value as 'study' | 'exam')}
          >
            <option value="study">Шууд тайлбар</option>
            <option value="exam">Шалгалт</option>
          </NativeSelect>
        </fieldset>
        {ready && (
          <fieldset className="inline-flex rounded-lg border p-1" aria-label="Асуултын хэл">
            <Button
              variant={language === 'en' ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={language === 'en'}
              disabled={busy}
              onClick={() => void change({ ...state, language: 'en' })}
            >
              EN
            </Button>
            <Button
              variant={language === 'mn' ? 'secondary' : 'ghost'}
              size="sm"
              aria-pressed={language === 'mn'}
              disabled={busy}
              onClick={() =>
                void change({
                  ...state,
                  language: 'mn',
                  translations: state.translations.includes(q.id)
                    ? state.translations
                    : [...state.translations, q.id],
                })
              }
            >
              MN
            </Button>
          </fieldset>
        )}
      </header>
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive bg-destructive-soft p-4 text-sm text-destructive"
        >
          {error}
        </p>
      )}
      {!done ? (
        <Card className="quiz pq border py-6 shadow-none ring-0 sm:py-8">
          <CardContent className="space-y-6 px-4 sm:px-8">
            <div className="pq-progress flex items-center gap-4">
              <div
                className="flex flex-1 gap-1"
                role="progressbar"
                aria-label="Явц"
                aria-valuetext={`${answered} / ${list.length} хариулсан`}
                aria-valuemin={0}
                aria-valuemax={list.length}
                aria-valuenow={answered}
              >
                {list.map((x, i) => (
                  <span
                    key={x.id}
                    className={
                      'h-1 min-w-0 flex-1 rounded-full ' +
                      ({
                        '': 'bg-border',
                        current: 'bg-foreground',
                        right: 'bg-success',
                        wrong: 'bg-destructive',
                        done: 'bg-foreground',
                      }[segmentState(x, i)] ?? 'bg-border')
                    }
                  />
                ))}
              </div>
              <small className="shrink-0 text-xs text-muted-foreground" aria-live="polite">
                Асуулт {index + 1} / {list.length}
              </small>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-md border bg-muted/50 px-2 py-1">
                {reveal ? domains[q.domain] : 'Холимог шалгалт'}
              </span>
              <span className="pq-id">{q.id}</span>
            </div>
            <h2 className="pq-prompt" ref={questionHeading} tabIndex={-1}>
              {text(q)}
            </h2>
            <fieldset className="grid gap-3" disabled={!ready || busy || locked}>
              <legend className="sr-only">Нэг зөв хариулт сонгоно уу</legend>
              {options(q).map((option, i) => (
                <AnswerCard
                  key={`${q.id}:${option}`}
                  name={q.id}
                  index={i}
                  text={option}
                  checked={chosen === i}
                  state={optionState(i)}
                  onSelect={() => setSelection(i)}
                />
              ))}
            </fieldset>
            {!locked ? (
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span id="conf-label">Хэр итгэлтэй байна?</span>
                <fieldset
                  className="inline-flex rounded-lg border p-1"
                  aria-labelledby="conf-label"
                >
                  {confidenceLevels.map(([id, label]) => (
                    <Button
                      variant={confidence === id ? 'secondary' : 'ghost'}
                      size="sm"
                      key={id}
                      aria-pressed={confidence === id}
                      disabled={!ready || busy}
                      onClick={() => setConfidence(id)}
                    >
                      {label}
                    </Button>
                  ))}
                </fieldset>
              </div>
            ) : (
              <div
                className={
                  'pq-verdict flex items-center gap-2 text-sm font-medium ' +
                  (reveal
                    ? picked === q.answer
                      ? 'text-success'
                      : 'text-destructive'
                    : 'text-muted-foreground')
                }
                role="status"
              >
                {reveal ? (
                  picked === q.answer ? (
                    <>
                      <Check className="size-4" /> Зөв сонголт
                    </>
                  ) : (
                    <>
                      <X className="size-4" /> Зөв хариулт: {letter(q.answer)}
                    </>
                  )
                ) : (
                  'Хариулт хадгалсан. Тайлбар багцын төгсгөлд гарна.'
                )}
              </div>
            )}
            {locked && reveal && <Explanation key={q.id} q={q} />}
            <footer className="flex flex-wrap items-center gap-2 border-t pt-5">
              <Button
                variant="ghost"
                size="icon"
                aria-pressed={saved}
                aria-label={saved ? 'Хадгалснаас хасах' : 'Асуултыг хадгалах'}
                onClick={() => toggleBookmark(q.id)}
              >
                <Bookmark fill={saved ? 'currentColor' : 'none'} />
              </Button>
              <span className="mr-auto hidden text-xs text-muted-foreground sm:inline">
                {answered}/{list.length} хариулсан
              </span>
              <Button
                variant="outline"
                disabled={!ready || busy || index === 0}
                onClick={() => void previous()}
              >
                <ArrowLeft /> Өмнөх
              </Button>
              {!locked ? (
                <Button
                  disabled={!ready || busy || selection === undefined}
                  onClick={() => void answer()}
                >
                  Хариултаа батлах
                </Button>
              ) : (
                <Button disabled={busy} onClick={() => void next()}>
                  {index === list.length - 1 ? 'Үр дүн харах' : 'Дараагийн асуулт'}
                  <ArrowRight />
                </Button>
              )}
            </footer>
          </CardContent>
        </Card>
      ) : (
        <QuizSummary
          state={state}
          list={list}
          correct={correct}
          busy={busy}
          onRestart={() => void newBatch()}
          text={text}
          options={options}
        />
      )}
      {!done && (
        <p className="hidden text-center text-xs text-muted-foreground sm:block">
          <kbd>1–4</kbd> / <kbd>A–D</kbd> сонгох · <kbd>Enter</kbd> батлах / дараах · <kbd>← →</kbd>{' '}
          шилжих
        </p>
      )}
      {history.length > 0 && (
        <Card className="border shadow-none ring-0">
          <CardContent className="space-y-3">
            <h2 className="font-medium">Өмнөх оролдлогууд</h2>
            {history.map((h) => (
              <details key={h.at} className="border-t pt-3 text-sm">
                <summary className="cursor-pointer text-muted-foreground">
                  {new Date(h.at).toLocaleString('mn-MN')} · {h.correct}/{h.total} ·{' '}
                  {h.mode === 'exam' ? 'Шалгах' : 'Дадлага'}
                </summary>
                {Object.entries(h.answers).map(([id, a]) => {
                  const old = byId[id];
                  return (
                    <p className="mt-3" key={id}>
                      {id} · {old ? old.options[a] : 'Архивын асуулт'}{' '}
                      {old && (a === old.answer ? '✓' : `— Зөв: ${old.options[old.answer]}`)}
                    </p>
                  );
                })}
              </details>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
