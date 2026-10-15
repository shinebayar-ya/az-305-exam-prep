# Tailwind / shadcn UI migration

Done 2026-10-17 with the [shadcn existing-Vite guide](https://ui.shadcn.com/docs/installation/vite#existing-project). Pico CSS and `web/style.css` were removed. UI rules are in `AGENTS.md`.

## Data boundary

The migration did not change question data, IDs, storage keys, database schema, scoring, batch selection, confidence or translation tracking. PGlite/IndexedDB is still the source of truth, and `useQuiz`/`bank` restore state the same way. Old and new tabs share the same document shape and storage locking.

## Rollback

Revert the UI, config and dependency changes together, then run `bun install`. Do not clear browser storage or change the database schema; no data rollback is needed.
