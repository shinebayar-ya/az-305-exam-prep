import { PGliteWorker } from '@electric-sql/pglite/worker';

let ready: Promise<PGliteWorker> | undefined;
function database() {
  ready ??= (async () => {
    const db = await PGliteWorker.create(
      new Worker(new URL('./db.worker.ts', import.meta.url), { type: 'module' }),
      { id: 'az305-study-v1' },
    );
    // study_progress and study_settings hold data from the removed plan tab. No UI reads them,
    // but they stay so existing data is kept and included in exportStudy().
    await db.exec(`CREATE TABLE IF NOT EXISTS study_progress (id TEXT PRIMARY KEY, completed_on TEXT, note TEXT NOT NULL DEFAULT '');
      CREATE TABLE IF NOT EXISTS study_documents (id TEXT PRIMARY KEY, value JSONB NOT NULL);
      CREATE TABLE IF NOT EXISTS study_settings (id INTEGER PRIMARY KEY CHECK(id=1), value JSONB NOT NULL);`);
    return db;
  })();
  return ready;
}
export function localDay() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ulaanbaatar',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export async function loadDocument<T>(id: string): Promise<T | undefined> {
  const db = await database();
  return (await db.query<{ value: T }>('SELECT value FROM study_documents WHERE id=$1', [id]))
    .rows[0]?.value;
}
export async function saveDocument(id: string, value: unknown) {
  const db = await database();
  await db.query(
    'INSERT INTO study_documents (id,value) VALUES ($1,$2) ON CONFLICT (id) DO UPDATE SET value=EXCLUDED.value',
    [id, JSON.stringify(value)],
  );
}

export async function exportStudy() {
  const db = await database();
  const progress = await db.query('SELECT id, completed_on, note FROM study_progress ORDER BY id');
  const settings = await db.query<{ value: unknown }>(
    'SELECT value FROM study_settings WHERE id=1',
  );
  const documents = await db.query('SELECT id,value FROM study_documents ORDER BY id');
  return {
    version: 2,
    exportedAt: new Date().toISOString(),
    progress: progress.rows,
    settings: settings.rows[0]?.value ?? null,
    documents: documents.rows,
  };
}
