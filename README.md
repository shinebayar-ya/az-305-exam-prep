# AZ-305 Preparation

A local study app for reviewing the Fast Lane course and preparing for the AZ-305 exam.

## Run

Requires Node.js 22.12+ and Bun.

```sh
bun install
bun run dev      # http://127.0.0.1:5173
bun run test
bun run build
bun run preview
```

There is no backend, login, or AI API. Progress, notes, and quiz history are stored in the browser with PGlite (IndexedDB, database `az305-study-v1`). Data is per browser and origin, so clearing site data deletes it. The "Ахиц татах" button exports everything as JSON; there is no import. The dev server uses a fixed port (`strictPort`).

## Layout

- `web/` is the React + TypeScript app (Tailwind CSS v4, shadcn/ui).
- `questions/questions.json` holds 200 source-checked practice questions. See `questions/COVERAGE.md`.
- `materials/INDEX.md` lists the course, study guide, and reference sources.
- `AGENTS.md` has the working instructions; `MEMORY.md` records decisions and progress.

The questions are written for this project. They are not copies of LevelUP or official exam questions.
