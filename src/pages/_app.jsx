/* DEFAULT TYPESCRIPT CODE FOR REFERENCE _app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
*/

import '../styles/globals.css'
import Head from 'next/head'
 export default function App({ Component, pageProps }) {
   return ( 
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>ULedger Challenge</title>
      {/* <link rel="icon" href="/images/favicon.png" /> */}
    </Head>

    <Component {...pageProps} />
  </>
   ) 
 }