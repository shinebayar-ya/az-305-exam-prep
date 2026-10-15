import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const q = read('../questions/questions.json'),
  sources = read('../materials/sources.json'),
  old = read('../questions/archive/v1.json');
test('200 bilingual questions, distinct IDs and prompts, valid answer mappings', () => {
  assert.equal(q.length, 200);
  assert.equal(new Set(q.map((x) => x.id)).size, 200);
  for (const field of ['prompt', 'prompt_en'])
    assert.equal(new Set(q.map((x) => x[field])).size, 200);
  for (const x of q) {
    assert.ok(!old.some((o) => o.id === x.id));
    for (const opts of [x.options, x.options_en]) {
      assert.equal(opts.length, 4);
      assert.equal(new Set(opts).size, 4);
    }
    assert.ok(Number.isInteger(x.answer) && x.answer >= 0 && x.answer < 4);
    assert.equal(x.option_explanations.length, 4);
    assert.ok(x.option_explanations[x.answer].startsWith('Зөв:'));
    assert.equal(x.option_explanations.filter((s) => s.startsWith('Зөв:')).length, 1);
    assert.equal(x.vocabulary.length, 3);
    assert.ok(x.tradeoffs.length > 40);
    assert.ok(x.sources.includes(x.source));
    for (const id of x.sources) {
      assert.ok(sources[id], `${x.id} missing ${id}`);
      assert.equal(new URL(sources[id].url).hostname, 'learn.microsoft.com');
      assert.equal(sources[id].checked, x.checked);
    }
  }
});
test('coverage and contrasting families', () => {
  const counts = Object.fromEntries(
    Object.entries(Object.groupBy(q, (x) => x.domain)).map(([d, xs]) => [d, xs.length]),
  );
  assert.deepEqual(counts, { identity: 56, data: 44, continuity: 36, infrastructure: 64 });
  // UI keys answer options and their explanations by text, so they must be unique per question.
  for (const x of [...q, ...old])
    for (const k of ['options', 'options_en', 'option_explanations'])
      if (x[k]) assert.equal(new Set(x[k]).size, x[k].length, `${x.id} ${k} has duplicates`);
  const families = Object.groupBy(q, (x) => x.family);
  assert.equal(Object.keys(families).length, 50);
  for (const items of Object.values(families)) {
    assert.equal(items.length, 4);
    assert.equal(new Set(items.map((x) => x.options_en[x.answer])).size, 4);
  }
  assert.ok(q.some((x) => x.difficulty === 'hard'));
  assert.ok(q.some((x) => x.difficulty === 'standard'));
});
test('legacy question IDs retained for persisted results', () => {
  assert.equal(old.length, 18);
  assert.deepEqual(
    old.map((x) => x.id),
    Array.from({ length: 18 }, (_, i) => `Q${String(i + 1).padStart(2, '0')}`),
  );
});
