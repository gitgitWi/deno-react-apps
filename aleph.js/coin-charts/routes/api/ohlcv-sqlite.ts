import { DB, type RowObject } from 'sqlite/mod.ts';

interface CoinPrice extends RowObject {
  id: number;
  ticker: string;
  time: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  volume: number;
  transactions: number;
}

const pricesDb = new DB('prices.db');

const TABLE_NAME = `prices`;

pricesDb.execute(`
CREATE TABLE IF NOT EXISTS "${TABLE_NAME}" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "ticker" TEXT,
  "time" INTEGER,
  "openPrice" INTEGER,
  "highPrice" INTEGER,
  "lowPrice" INTEGER,
  "closePrice" INTEGER,
  "volume" INTEGER,
  "transactions" INTEGER
)`);

const { POLYGON_IO_API_KEY } = Deno.env.toObject();
const POLYGON_IO_API_BASE_URL = `https://api.polygon.io`;

export const GET = async (req: Request) => {
  const params = new URL(req.url).searchParams;
  const ticker = params.get('ticker') || '';

  if (!ticker) return new Response('Missing ticker parameter', { status: 404 });

  const coinTicker = `X:${ticker}`;
  const period = params.get(`period`) || 'day';

  const todayTime = new Date().getTime();
  const oneYearAgoTime = new Date(todayTime - 1000 * 60 * 60 * 24 * 365).getTime();

  const lastDateTime = params.get(`last`) || todayTime;
  const startDateTime = params.get(`first`) || oneYearAgoTime;

  const pricesCached = pricesDb.queryEntries<CoinPrice>(
    `SELECT * 
    FROM ${TABLE_NAME} 
    WHERE ticker = :ticker 
    AND time <= :lastDateTime
    AND time >= :startDateTime
    ORDER BY time DESC`,
    {
      ticker,
      lastDateTime,
      startDateTime,
    },
  );

  if (pricesCached.length > 0)
    return new Response(JSON.stringify({ prices: pricesCached }));

  const apiUrl = `${POLYGON_IO_API_BASE_URL}/v2/aggs/ticker/${coinTicker}/range/1/${period}/${startDateTime}/${lastDateTime}?apiKey=${POLYGON_IO_API_KEY}`;

  try {
    const { results } = await fetch(apiUrl).then((res) => res.json());

    if (!Array.isArray(results)) throw new Error('Type of API Results is not Array');

    const insertStmt = `INSERT INTO ${TABLE_NAME} (ticker, time, openPrice, highPrice, lowPrice, closePrice, volume, transactions) 
    VALUES ${results
      .map(
        ({ o, h, l, c, v, n, t }) =>
          `('${ticker}', ${t}, ${o}, ${h}, ${l}, ${c}, ${v}, ${n})`,
      )
      .join(', ')}`;

    pricesDb.execute(insertStmt);
    return new Response(JSON.stringify({ prices: results }));
  } catch (error) {
    console.error(`API$$OHLCV$$GET\n`, error);

    return new Response(JSON.stringify({ prices: [] }), {
      status: 500,
      statusText: 'ERROR on Server',
    });
  }
};
