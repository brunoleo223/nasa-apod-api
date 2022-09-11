/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="https://unpkg.co/gsap/dist/gsap.min.js"></script>
        <Script
          src="main.js"
          strategy="lazyOnload"
        />
      </body>
    </Html>
  )
}