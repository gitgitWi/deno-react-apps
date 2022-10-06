export const POLYGON_API = {
  baseUrl: `https://api.polygon.io`,
  apiToken: Deno.env.get('POLYGON_IO_API_KEY') || '',
} as const;

export const AWS = {
  accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') || '',
  secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') || '',
} as const;
