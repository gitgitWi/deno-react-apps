import { DB, type RowObject } from 'sqlite/mod.ts';

import { DBClientAdapter } from '@/services/db/DBClientAdapter.ts';

export class SqliteAdapter extends DBClientAdapter {
  constructor() {
    super();
  }
}
