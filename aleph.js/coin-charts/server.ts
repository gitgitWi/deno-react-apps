import { serve } from 'aleph/react-server';
import 'std/dotenv/load.ts';

import routes from './routes/_export.ts';
import unocss from './uno.config.ts';

serve({
  baseUrl: import.meta.url,
  router: { routes },
  ssr: true,
  unocss,
});
