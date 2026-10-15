import { PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';

worker({
  async init() {
    return new PGlite('idb://az305-study-v1');
  },
});
