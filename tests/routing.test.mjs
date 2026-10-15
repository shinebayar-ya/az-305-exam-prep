import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

import { webLoader } from './load-web.mjs';

const page = (label) => () => React.createElement('h1', null, label);
const load = webLoader({
  './Materials': { Materials: page('Эх сурвалжийн сан') },
  './Practice': { Practice: page('Practice') },
  './storage': { exportStudy: async () => ({}), localDay: () => '' },
  './topics/TopicsPage': { TopicsPage: page('TopicsPage') },
});
const { App } = load('App.tsx');
for (const [path, content] of [
  ['/practice', 'Practice'],
  ['/topics', 'TopicsPage'],
  ['/materials', 'Эх сурвалжийн сан'],
  ['/topics#topic/identity-governance', 'TopicsPage'],
])
  test(`direct entry ${path} renders the matching page and active sidebar link`, () => {
    const html = renderToStaticMarkup(
      React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(App)),
    );
    assert.ok(html.includes(content));
    const links = html.match(/<a[^>]*aria-current="page"[^>]*>/g) ?? [];
    assert.equal(links.length, 1);
    assert.ok(links[0].includes(`href="${path.split('#')[0]}"`));
    for (const url of ['/practice', '/topics', '/materials'])
      assert.ok(html.includes(`href="${url}"`));
    assert.ok(!html.includes('href="/plan"'));
  });
