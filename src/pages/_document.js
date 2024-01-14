import Header from '@/components/header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Movex</title>
      <link rel="shortcut icon" href="/movix-logo.png" type="image/x-icon" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
