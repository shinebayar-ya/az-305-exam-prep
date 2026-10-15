import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AnswerState = '' | 'chosen' | 'right' | 'wrong' | 'muted';
export function AnswerCard({
  name,
  index,
  text,
  checked,
  state,
  onSelect,
}: {
  name: string;
  index: number;
  text: string;
  checked: boolean;
  state: AnswerState;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        'pq-option relative flex min-h-16 w-full cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm leading-relaxed',
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-ring',
        'has-disabled:cursor-default',
        state === '' && 'has-enabled:hover:bg-muted/60',
        state === 'chosen' && 'border-foreground bg-muted ring-1 ring-foreground',
        state === 'right' && 'border-success bg-success-soft',
        state === 'wrong' && 'border-destructive bg-destructive-soft',
        state === 'muted' && 'text-muted-foreground',
      )}
    >
      <input
        className="peer sr-only"
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
      />
      <span
        aria-hidden="true"
        className={cn(
          'grid size-7 shrink-0 place-items-center rounded-md border text-xs',
          state === 'chosen' && 'border-primary bg-primary text-primary-foreground',
          state === 'right' && 'border-success text-success',
          state === 'wrong' && 'border-destructive text-destructive',
        )}
      >
        {String.fromCharCode(65 + index)}
      </span>
      <span className="min-w-0 flex-1 wrap-anywhere">{text}</span>
      {state === 'right' ? (
        <span className="flex items-center gap-1 text-xs text-success">
          <Check className="size-4" />
          <span className="sr-only">Зөв хариулт</span>
        </span>
      ) : state === 'wrong' ? (
        <span className="flex items-center gap-1 text-xs text-destructive">
          <X className="size-4" />
          <span className="sr-only">Буруу хариулт</span>
        </span>
      ) : (
        // biome-ignore lint/a11y/noAriaHiddenOnFocusable: false positive — <kbd> is not focusable; hint is visual only.
        <kbd className="hidden text-xs text-muted-foreground sm:inline" aria-hidden="true">
          {index + 1}
        </kbd>
      )}
    </label>
  );
}
