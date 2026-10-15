# Topics: adding and editing content

The "Сэдэв ба тэмдэглэл" tab shows one page per topic from `content/topics/<id>.json`. All 16 syllabus topics are written. To work on one, prompt: "Seed topic `<id>` following `notes/TOPICS-PLAN.md`."

## Files

- `content/topics/<id>.json`: topic content. Usually the only file you add.
- `web/content/syllabus.ts`: the id list. Ids without a JSON file show as "coming soon".
- `web/content/schema.ts`: the `Topic` type and the source of truth for the format below.
- `web/icons/registry.ts`: `topicIcons` (one official Azure SVG per id) and `sceneIcons` (allowed Lucide names). Icon terms are in `web/icons/azure/SOURCE.md`.
- `web/topics/`, `web/notes/`: the page sections and the Tiptap note editor.

Notes are Markdown strings in the PGlite `study_documents` table under `topic:<id>`. Old textarea notes stay read-only under `topic:<domain>`. The first edit copies them to `topic:legacy-<domain>`.

## Topic format

```jsonc
{
  "id": "storage",                  // = file name, = syllabus id
  "domain": "data",                 // identity | data | continuity | infrastructure
  "order": 7,
  "title": "English service-level title",
  "tagline": "Нэг өгүүлбэр, асуулт хэлбэрээр",
  "checked": "YYYY-MM-DD",          // day the facts were verified on Learn, never invented
  "sources": ["redundancy"],        // keys in materials/sources.json; also select practice questions
  "analogy": { "title": "…", "story": "…", "mapping": [{ "real": "…", "azure": "…" }] },
  "illustration": { "scene": ["KeyRound", "Archive"], "caption": "…", "image": null },  // 2–8 sceneIcons names
  "mnemonics": [{ "device": "…", "parts": [{ "key": "L", "meaning": "…" }], "why": "Requirement → decision: …" }],
  "keyFacts": [{ "text": "…", "source": "redundancy" }],   // source must also be in "sources"
  "compare": { "caption": "…", "columns": ["…"], "rows": [["row header", "…"]] },  // optional
  "examTraps": [{ "trap": "…", "truth": "…", "phrase_en": "…" }],
  "vocabulary": [{ "en": "…", "mn": "…" }]                 // optional
}
```

Strings may use `**bold**`, `*italic*`, `` `code` `` and blank-line paragraphs. No emoji. `tests/topics.test.mjs` checks the schema, source keys, icon entries and emoji.

## Adding a topic

1. List existing question sources for the area: `jq -r '[.[]|select(.domain=="identity")|.source]|unique' questions/questions.json`.
2. Fetch every Microsoft Learn page you cite and take exact numbers and limits from it. Add missing pages to `materials/sources.json` as `{id, title, url, checked}`.
3. Write the JSON. Add a `topicIcons` entry, and any new `sceneIcons` names.
4. Run `bun run test` and `bun run build`, then check `http://127.0.0.1:5173/#topic/<id>` at 1280px and 400px for horizontal overflow.

## Style

- Explanations are in Mongolian. Azure service, SKU and feature names stay in English. `phrase_en` and `vocabulary.en` use English exam wording.
- The analogy is one everyday scene, funny through exaggeration. Each mapping row links one thing to one Azure concept. End on what the analogy does not cover.
- Mnemonics encode requirement → decision, not keyword → service. `why` starts from the question you would ask in the scenario.
- Write 6–12 key facts, one claim each, with the deciding term in bold. No prices or SLA % unless asked.
- Write 3–6 exam traps. `trap` is the plausible wrong belief, `truth` the correction, `phrase_en` realistic wording that is not copied from a real exam.
- Add a compare table only when 3+ options differ on 2+ requirements: options in rows, ✓/✗, exceptions in `caption`.
- Leave out anything you could not verify, or mark it "эх сурвалжаар дахин шалгаагүй".

## Dependencies

All `@tiptap/*` packages are pinned to `3.31.4` and must be upgraded together. `@tiptap/markdown` is the official package (`contentType: 'markdown'`, `editor.getMarkdown()`). Inter is bundled through `@fontsource-variable/inter`, so it works offline.

## Backlog

- The main chunk is about 1.17 MB (PGlite + Tiptap). Lazy-load `NoteEditor` and `TopicsPage`.
- Show domain exam weights in the hero after checking the official study guide.
- Add a "practice these" button that starts a quiz filtered to `topic.sources`.