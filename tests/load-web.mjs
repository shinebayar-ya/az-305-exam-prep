import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual TSX modules with React's server renderer, without a browser or database.
export function webLoader(mocks = {}) {
  const root = fileURLToPath(new URL('../web/', import.meta.url));
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const nativeRequire = createRequire(file);
    const exports = {};
    cache.set(file, exports);
    const code = ts.transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    vm.runInNewContext(code, {
      exports,
      require: (id) => {
        if (Object.hasOwn(mocks, id)) return mocks[id];
        if (id.startsWith('@/') || id.startsWith('.')) {
          const base = id.startsWith('@/')
            ? resolve(root, id.slice(2))
            : resolve(dirname(file), id);
          const target = [`${base}.tsx`, `${base}.ts`].find(existsSync);
          if (target) return load(target);
        }
        return nativeRequire(id);
      },
    });
    return exports;
  }
  return (name) => load(resolve(root, name));
}
