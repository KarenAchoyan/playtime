import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="hy">
        <Head>
            <link rel="icon" href="/favicon.png" type="image/png"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#000000"/>
        </Head>
        <body>
        <div style={{overflowX: 'hidden'}}>
            <Main/>
        </div>
        <NextScript/>
        </body>
    </Html>
  )
}
