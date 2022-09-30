import {} from 'https://esm.sh/@tanstack/react-query@4.8.0';

import Header from '../components/Header.tsx';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
