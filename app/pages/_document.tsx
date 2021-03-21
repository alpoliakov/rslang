import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="HandheldFriendly" content="true" />
          <meta name="keywords" content="rs-lang" />
          <meta name="description" content="RS Lang" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700;800;900&display=swap"
          />
          <link
            rel="stylesheet"
            media="print"
            href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700;800;900&display=swap"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700;800;900&display=swap"
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
