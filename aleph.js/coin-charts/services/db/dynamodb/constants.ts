const coinDaily = 'coin-daily';
const coinWeekly = 'coin-weekly';
const coinHourly = 'coin-hourly';

export type TableNames = typeof coinDaily | typeof coinWeekly | typeof coinHourly;

export const TABLES = {
  coinDaily,
  coinWeekly,
  coinHourly,
} as const;
