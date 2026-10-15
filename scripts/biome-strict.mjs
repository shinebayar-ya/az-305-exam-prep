// Runs Biome and fails on ANY diagnostic: errors, warnings and infos.
// Biome has --error-on-warnings but no equivalent for infos, so infos are detected from its summary.
// Usage: node scripts/biome-strict.mjs <biome args...>   e.g. `ci .` or `check --staged`
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const biome = fileURLToPath(new URL('../node_modules/.bin/biome', import.meta.url));
// --colors=off: ANSI codes would break the summary regex below.
const result = spawnSync(biome, [...process.argv.slice(2), '--error-on-warnings', '--colors=off'], {
  encoding: 'utf8',
});
if (result.error) {
  console.error(`Failed to run Biome: ${result.error.message}`);
  process.exit(1);
}
process.stdout.write(result.stdout);
process.stderr.write(result.stderr);

const hasInfos = /Found \d+ infos?\./.test(result.stdout + result.stderr);
if (hasInfos) console.error('\nBiome reported info diagnostics; this repo requires zero.');
process.exit(result.status || (hasInfos ? 1 : 0));
