import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const file = new URL('../web/bank.ts', import.meta.url);
const code = ts.transpileModule(readFileSync(file, 'utf8'), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;
const exports = {};
vm.runInNewContext(code, { exports, require: createRequire(file) });
const { bank, byId, selectBatch, restoreQuiz } = exports;
const base = {
  answers: {},
  index: 0,
  done: false,
  filter: 'all',
  history: [],
  questionIds: selectBatch('all', true),
  mode: 'study',
  hard: true,
  language: 'en',
  confidence: {},
  translations: [],
  seenIds: [],
};
test('legacy active sessions and historic scores retain original questions', () => {
  const old = {
    answers: { Q01: 1 },
    index: 1,
    done: false,
    filter: 'all',
    history: [{ at: '2026-10-15', correct: 1, total: 18, answers: { Q01: 1 } }],
  };
  const state = restoreQuiz(old, base);
  assert.equal(state.questionIds.length, 18);
  assert.equal(state.questionIds[1], 'Q02');
  assert.equal(state.answers.Q01, 1);
  assert.equal(state.history[0].total, 18);
  assert.equal(state.index, 1);
  assert.equal(restoreQuiz({ ...old, filter: 'continuity', index: 0 }, base).questionIds.length, 3);
});
test('new sessions keep fixed IDs despite bank size and reject missing IDs', () => {
  const state = restoreQuiz({ ...base, index: 5, language: 'mn' }, base);
  assert.equal(JSON.stringify(state.questionIds), JSON.stringify(base.questionIds));
  assert.equal(state.index, 5);
  assert.equal(state.language, 'mn');
  assert.throws(() => restoreQuiz({ ...base, questionIds: ['missing'] }, base));
});
test('batches have unique IDs, balanced domains, no family repetition on fresh mixed batch', () => {
  for (const hard of [false, true])
    for (let i = 0; i < 20; i++) {
      const ids = selectBatch('all', hard);
      assert.equal(ids.length, 20);
      assert.equal(new Set(ids).size, 20);
      const qs = ids.map((id) => byId[id]);
      assert.equal(new Set(qs.map((q) => q.family)).size, 20);
      const counts = Object.fromEntries(
        ['identity', 'data', 'continuity', 'infrastructure'].map((d) => [
          d,
          qs.filter((q) => q.domain === d).length,
        ]),
      );
      assert.deepEqual(counts, { identity: 6, data: 4, continuity: 4, infrastructure: 6 });
      if (hard) assert.ok(qs.every((q) => q.difficulty === 'hard'));
    }
});
test('unanswered items precede seen items within each domain', () => {
  for (const d of ['identity', 'data', 'continuity', 'infrastructure']) {
    const candidates = bank.filter((q) => q.domain === d);
    const unseen = candidates.slice(0, 4).map((q) => q.id);
    const seen = candidates.slice(4).map((q) => q.id);
    const ids = selectBatch(d, false, seen);
    assert.equal(new Set(ids).size, 20);
    assert.ok(unseen.every((id) => ids.includes(id)));
  }
});
