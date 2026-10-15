import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { webLoader } from './load-web.mjs';

const load = webLoader({
  './storage': {
    loadDocument: () => {
      throw Error('Initial render must not wait for storage');
    },
    saveDocument: () => {
      throw Error('Initial render must not write storage');
    },
  },
});

test('first render displays a local question before storage hydration and guards answers', () => {
  const { Practice } = load('Practice.tsx');
  const html = renderToStaticMarkup(React.createElement(Practice));
  assert.match(html, /class="pq-prompt"/);
  assert.equal((html.match(/type="radio"/g) ?? []).length, 4);
  assert.doesNotMatch(html, /Дадлага ачаалж байна/);
  assert.match(html, /<fieldset[^>]*disabled=""/);
  assert.doesNotMatch(html, /class="feedback"/);
});

function renderSession(overrides = {}) {
  const { bank } = load('bank.ts');
  const ids = bank.slice(0, 2).map((q) => q.id);
  const state = {
    answers: {},
    index: 0,
    done: false,
    filter: 'all',
    history: [],
    questionIds: ids,
    mode: 'study',
    hard: true,
    language: 'en',
    confidence: {},
    translations: [],
    seenIds: [],
    ...overrides,
  };
  const session = webLoader({
    './useQuiz': {
      useQuiz: () => ({
        state,
        ready: true,
        busy: false,
        error: '',
        change: () => {},
        start: () => {},
      }),
    },
  });
  return {
    html: renderToStaticMarkup(React.createElement(session('Practice.tsx').Practice)),
    bank,
    ids,
  };
}

test('study review retains submitted answers and shows contextual explanations', () => {
  const { bank, ids } = renderSession();
  const { html } = renderSession({ answers: { [ids[0]]: bank[0].answer } });
  assert.match(html, /Шийдвэрийн тайлбар/);
  assert.match(html, /Зөв сонголт/);
  assert.match(html, /Дараагийн асуулт/);
  assert.match(html, /<details open=""/);
});

test('exam mode keeps feedback hidden until completion, including when revisiting answers', () => {
  const { ids } = renderSession();
  const { html } = renderSession({ mode: 'exam', index: 1, answers: { [ids[0]]: 0, [ids[1]]: 1 } });
  assert.doesNotMatch(html, /Шийдвэрийн тайлбар/);
  assert.doesNotMatch(html, /Зөв хариулт:/);
  assert.match(html, /Тайлбар багцын төгсгөлд гарна/);
  assert.match(html, /Өмнөх/);
});

test('completion offers full review and incorrect-answer filter', () => {
  const { ids } = renderSession();
  const { html } = renderSession({ done: true, answers: { [ids[0]]: 0, [ids[1]]: 1 } });
  assert.match(html, /Багц дууслаа/);
  assert.match(html, /Буруу хариулт/);
  assert.match(html, /Шинэ багц эхлэх/);
  assert.doesNotMatch(html, /class="pq-prompt"/);
});
