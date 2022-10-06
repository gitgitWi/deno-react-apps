export const POLYGON_API = {
  baseUrl: `https://api.polygon.io`,
  apiToken: Deno.env.get('POLYGON_IO_API_KEY'),
} as const;
