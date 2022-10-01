const { POLYGON_IO_API_KEY } = Deno.env.toObject();
const POLYGON_IO_API_BASE_URL = `https://api.polygon.io`;

export const GET = async (req: Request) => {
  const params = new URL(req.url).searchParams;
  const ticker = params.get('ticker') || '';

  if (!ticker) return new Response('Missing ticker parameter', { status: 404 });

  const apiUrl = `${POLYGON_IO_API_BASE_URL}/v2/aggs/ticker/${ticker}/range/1/day/2021-01-01/2021-12-31?apiKey=${POLYGON_IO_API_KEY}`;

  const data = await fetch(apiUrl).then((res) => res.json());

  return new Response(JSON.stringify(data));
};
