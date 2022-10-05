import { Head } from 'aleph/react';
// import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

export default function Index() {
  const { data } = useQuery(['index-query-test'], () => {
    return fetch(`/api/ohlcv?ticker=${'ETCUSD'}`).then((res) => res.json());
  });

  return (
    <main className="w-screen flex flex-col items-center justify-center">
      <Head>
        <title>Oui Coins Charts</title>
        <meta name="description" content="The Fullstack Framework in Deno." />
      </Head>

      <pre className="w-3/5 my-4 p-4 rounded-xl bg-gray-100 text-gray-900">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
