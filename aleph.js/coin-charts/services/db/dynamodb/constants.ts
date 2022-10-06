const coinDaily = 'coinDaily';
const coinWeekly = 'coinWeekly';
const coinHourly = 'coinHourly';

export type TableNames = typeof coinDaily | typeof coinWeekly | typeof coinHourly;

export const TABLES: Record<TableNames, TableNames> = {
  coinDaily,
  coinWeekly,
  coinHourly,
} as const;
