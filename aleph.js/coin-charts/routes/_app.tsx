import { QueryClient, QueryClientProvider } from 'react-query';

import Header from '@/components/Header.tsx';

const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
    </QueryClientProvider>
  );
}
