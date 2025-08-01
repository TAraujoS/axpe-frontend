import React, { useEffect, useCallback } from 'react'

import HeaderStyles from 'layouts/vendors/headerStyles';

// helpers
import CookieUtmParams from 'helpers/cookieUtmParams';

// layout
import Main from 'layouts/main';

// store
import { wrapper } from '../src/store';

// CSS imports - otimizados
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  // Otimizado para evitar reflows desnecessários
  const initializeApp = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Usar requestAnimationFrame para evitar forced reflows
      requestAnimationFrame(() => {
        CookieUtmParams.set(window.location.search);
      });
    }
  }, []);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <Main>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <HeaderStyles />
      <Component {...pageProps} />
    </Main>
  );
}

export default wrapper.withRedux(MyApp);