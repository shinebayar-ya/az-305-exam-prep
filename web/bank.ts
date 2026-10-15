import old from '../questions/archive/v1.json';
import current from '../questions/questions.json';
import type { Quiz } from './useQuiz';
export interface Question {
  id: string;
  domain: string;
  family?: string;
  source: string;
  sources?: string[];
  prompt: string;
  prompt_en?: string;
  options: string[];
  options_en?: string[];
  answer: number;
  explanation: string;
  option_explanations?: string[];
  tradeoffs?: string;
  checked: string;
  difficulty?: string;
  vocabulary?: { en: string; mn: string }[];
}
export const bank: Question[] = current;
export const legacy: Question[] = old;
export const allQuestions: Question[] = [...legacy, ...bank];
export const byId = Object.fromEntries(allQuestions.map((q) => [q.id, q]));
export function selectBatch(
  filter: string,
  hard: boolean,
  seen: string[] = [],
  random: () => number = Math.random,
) {
  const eligible = bank.filter(
    (q) => (filter === 'all' || q.domain === filter) && (!hard || q.difficulty === 'hard'),
  );
  const pick = (candidates: Question[], count: number) => {
    const shuffled = candidates
      .map((q) => ({ q, rank: random() }))
      .sort((a, b) => a.rank - b.rank)
      .map((x) => x.q);
    const selected: Question[] = [];
    const families = new Set<string | undefined>();
    for (const wasSeen of [false, true]) {
      const pool = shuffled.filter((q) => seen.includes(q.id) === wasSeen);
      for (const uniqueFamily of [true, false])
        for (const q of pool) {
          if (selected.length === count) return selected;
          if (!selected.includes(q) && (!uniqueFamily || !families.has(q.family))) {
            selected.push(q);
            families.add(q.family);
          }
        }
    }
    return selected;
  };
  const selected =
    filter === 'all'
      ? Object.entries({ identity: 6, data: 4, continuity: 4, infrastructure: 6 }).flatMap(
          ([domain, count]) =>
            pick(
              eligible.filter((q) => q.domain === domain),
              count,
            ),
        )
      : pick(eligible, 20);
  return selected
    .map((q) => ({ id: q.id, rank: random() }))
    .sort((a, b) => a.rank - b.rank)
    .map((x) => x.id);
}

export function restoreQuiz(value: Partial<Quiz> | undefined, base: Quiz): Quiz {
  const ids =
    value?.questionIds ??
    (value
      ? legacy
          .filter((q) => !value.filter || value.filter === 'all' || q.domain === value.filter)
          .map((q) => q.id)
      : base.questionIds);
  if (!ids.length || ids.some((id) => !byId[id])) throw Error('Unknown question IDs');
  return {
    ...base,
    ...value,
    questionIds: ids,
    index: Math.max(0, Math.min(value?.index ?? 0, ids.length - 1)),
    history: value?.history ?? [],
  };
}
