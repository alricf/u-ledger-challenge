// Imports
import '../styles/globals.css';
import Head from 'next/head';
export default function App({ Component, pageProps }) {

  // Template
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ULedger Challenge</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}