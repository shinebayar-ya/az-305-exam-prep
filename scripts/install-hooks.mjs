// Links versioned hooks from .githooks/ into .git/hooks/ (run by `prepare` on install).
// Links individual hooks instead of setting core.hooksPath, so other hooks in .git/hooks
// (e.g. repowise's post-commit) keep working. Never overwrites a hook it did not create.
import { execFileSync } from 'node:child_process';
import { chmodSync, lstatSync, readdirSync, readlinkSync, symlinkSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

let hooksDir;
try {
  hooksDir = resolve(
    execFileSync('git', ['rev-parse', '--git-path', 'hooks'], { encoding: 'utf8' }).trim(),
  );
} catch {
  process.exit(0); // not a git checkout (e.g. installed from a tarball): nothing to do
}
const sourceDir = resolve(import.meta.dirname, '../.githooks');

for (const name of readdirSync(sourceDir)) {
  const source = join(sourceDir, name);
  const target = join(hooksDir, name);
  const link = relative(hooksDir, source);
  chmodSync(source, 0o755);
  const existing = lstatSync(target, { throwIfNoEntry: false }); // lstat: sees dangling links too
  if (existing) {
    const ours = existing.isSymbolicLink() && readlinkSync(target) === link;
    if (!ours) console.warn(`[hooks] ${target} exists and is not ours; left untouched.`);
    continue;
  }
  symlinkSync(link, target);
  console.log(`[hooks] installed ${name}`);
}
