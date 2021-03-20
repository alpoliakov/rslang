import Head from 'next/head';
import React, { useState } from 'react';

import Loading from '../components/Loading';

export default function Home() {
  const [state, setState] = useState(false);

  if (state) {
    return <Loading />;
  }

  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1>Home page</h1>
    </div>
  );
}
