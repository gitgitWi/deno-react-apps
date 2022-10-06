import { POLYGON_API } from '@/constants/mod.ts';

import { DynamoDBAdapter } from '@/services/db/dynamodb/mod.ts';

const TABLE_NAME = `coinsDaily`;

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

  /** @todo */
  const pricesCached: any[] = [];

  if (pricesCached.length > 0)
    return new Response(JSON.stringify({ prices: pricesCached }));

  const apiUrl = `${POLYGON_API.baseUrl}/v2/aggs/ticker/${coinTicker}/range/1/${period}/${startDateTime}/${lastDateTime}?apiKey=${POLYGON_API.apiToken}`;

  try {
    const { results } = await fetch(apiUrl).then((res) => res.json());

    if (!Array.isArray(results)) throw new Error('Type of API Results is not Array');

    return new Response(JSON.stringify({ prices: results }));
  } catch (error) {
    console.error(`API$$OHLCV$$GET\n`, error);

    return new Response(JSON.stringify({ prices: [] }), {
      status: 500,
      statusText: 'ERROR on Server',
    });
  }
};
