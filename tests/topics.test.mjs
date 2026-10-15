import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const dir = new URL('../content/topics/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
const topics = files.map((f) => ({ file: f, ...read(`../content/topics/${f}`) }));
const sources = read('../materials/sources.json');
const domains = ['identity', 'data', 'continuity', 'infrastructure'];

test('topic files exist with unique ids matching file names', () => {
  assert.ok(topics.length > 0);
  assert.equal(new Set(topics.map((t) => t.id)).size, topics.length);
  for (const t of topics) assert.equal(t.file, `${t.id}.json`);
});

test('topics have every required section', () => {
  for (const t of topics) {
    assert.ok(domains.includes(t.domain), `${t.id}: domain`);
    assert.match(t.checked, /^\d{4}-\d{2}-\d{2}$/, `${t.id}: checked date`);
    for (const k of ['title', 'tagline']) assert.ok(t[k]?.trim(), `${t.id}: ${k}`);
    assert.ok(t.analogy?.story && t.analogy.mapping?.length, `${t.id}: analogy`);
    assert.ok(
      Array.isArray(t.illustration?.scene) &&
        t.illustration.scene.length >= 2 &&
        t.illustration.scene.length <= 8 &&
        t.illustration.caption,
      `${t.id}: illustration`,
    );
    assert.ok(
      t.mnemonics?.length && t.mnemonics.every((m) => m.device && m.parts.length && m.why),
      `${t.id}: mnemonics`,
    );
    assert.ok(t.keyFacts?.length, `${t.id}: keyFacts`);
    assert.ok(
      t.examTraps?.length && t.examTraps.every((x) => x.trap && x.truth && x.phrase_en),
      `${t.id}: examTraps`,
    );
    if (t.compare)
      for (const r of t.compare.rows)
        assert.equal(r.length, t.compare.columns.length, `${t.id}: compare row ${r[0]}`);
  }
});

test('every cited source key exists in materials/sources.json', () => {
  for (const t of topics) {
    for (const s of t.sources) assert.ok(sources[s], `${t.id}: unknown source ${s}`);
    for (const f of t.keyFacts)
      assert.ok(
        sources[f.source] && t.sources.includes(f.source),
        `${t.id}: fact source ${f.source}`,
      );
  }
});

// Icon system (Step 2b): registry names, files and emoji-free content.
const registry = readFileSync(new URL('../web/icons/registry.ts', import.meta.url), 'utf8');
const topicIconIds = [
  ...registry
    .match(/export const topicIcons = \{([\s\S]*?)\} as const/)[1]
    .matchAll(/^\s*'?([\w-]+)'?:\s*\{/gm),
].map((m) => m[1]);
const sceneNames = registry
  .match(/export const sceneIcons = \{([^}]*)\}/)[1]
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean);
const svgFiles = [...registry.matchAll(/from '\.\/azure\/([\w-]+\.svg)'/g)].map((m) => m[1]);

test('every topic has an icon, scene names are allowlisted', () => {
  assert.equal(topicIconIds.length, 16);
  for (const t of topics) {
    assert.ok(topicIconIds.includes(t.id), `${t.id}: no topicIcons entry`);
    for (const n of t.illustration.scene)
      assert.ok(sceneNames.includes(n), `${t.id}: unknown scene icon ${n}`);
  }
});

test('registry SVG files exist', () => {
  assert.equal(svgFiles.length, 16);
  for (const f of svgFiles)
    assert.doesNotThrow(() => readFileSync(new URL(`../web/icons/azure/${f}`, import.meta.url)), f);
});

test('topic content has no emoji', () => {
  for (const t of topics)
    assert.ok(!/\p{Extended_Pictographic}/u.test(JSON.stringify(t)), `${t.id}: emoji in content`);
});

test('every source is filed under a syllabus topic', () => {
  const ids = new Set(
    [
      ...readFileSync(new URL('../web/content/syllabus.ts', import.meta.url), 'utf8').matchAll(
        /id: '([^']+)'/g,
      ),
    ].map((m) => m[1]),
  );
  for (const [k, s] of Object.entries(sources))
    assert.ok(ids.has(s.topic), `${k}: unknown topic ${s.topic}`);
});
