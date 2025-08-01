import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import Router from 'next/router';
import dynamic from 'next/dynamic';

// actions
import { setLoading } from 'store/modules/loading/actions';
import { setMain } from 'store/modules/main/actions';

// components
import Loading from 'components/Loading';
import Header from 'components/Header';
import Footer from 'components/Footer';
const Search = dynamic(() => import('components/Search'));
const NewsletterModal = dynamic(() => import('components/Modals/Newsletter'));
const NewsletterSuccessModal = dynamic(() => import('components/Modals/NewsletterSuccess'));
const RegisterSuccessModal = dynamic(() => import('components/Modals/RegisterSuccess'));
const BuildingContactSuccess = dynamic(() => import('components/Modals/BuildingContactSuccess'));
const ContactSuccess = dynamic(() => import('components/Modals/ContactSuccess'));
const WorkWithUsSuccess = dynamic(() => import('components/Modals/WorkWithUsSuccess'));
const ContactModal = dynamic(() => import('components/Modals/Contact'));
const ContactBar = dynamic(() => import('components/ContactBar'));
const TermsOfUse = dynamic(() => import('components/TermsOfUse'));
const PrivacyPolicy = dynamic(() => import('components/PrivacyPolicy'));

// styles
import GlobalStyle from './globalStyle';
import noUiSliderCSS from './vendors/noUiSlider';
import simplebarCSS from './vendors/simplebar';
import tailwindCSS from './vendors/tailwind';
import ThemeStyle from './themeStyle';
import { Wrapper } from './styles';

function Main({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Otimizado para evitar forced reflows
  const handleRouteChangeStart = useCallback((a) => {
    // Usar requestAnimationFrame para evitar forced reflows
    requestAnimationFrame(() => {
      const cachedPageHeight = document.documentElement.offsetHeight;
      window.cachedPageHeight = window.cachedPageHeight || [];
      window.cachedPageHeight.push(cachedPageHeight);
      
      dispatch(
        setMain({
          searchFormActive: false,
          headerHiding: false,
        })
      );
      dispatch(setLoading({ active: true }));
    });
  }, [dispatch]);

  const handleRouteChangeComplete = useCallback(() => {
    requestAnimationFrame(() => {
      const html = document.querySelector('html');
      if (html) {
        html.style.height = 'initial';
      }
      
      dispatch(setLoading({ active: false }));
      
      if (location && location.pathname.search('busca') < 0) {
        window.scrollTo(0, 0);
      }
    });
  }, [dispatch]);

  const handleBeforePopState = useCallback(() => {
    requestAnimationFrame(() => {
      const html = document.querySelector('html');
      if (html && window.cachedPageHeight && window.cachedPageHeight.length > 0) {
        const height = window.cachedPageHeight.pop();
        html.style.height = `${height}px`;
      }
    });
    return true;
  }, []);

  useEffect(() => {
    // scroll issue related here https://github.com/zeit/next.js/issues/3303
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.beforePopState(handleBeforePopState);

    // window.addEventListener('beforeinstallprompt', (e) => {
    //   e.preventDefault();
    //   console.log('exibir botão para adicionar app na home!')
    // });

    dispatch(setLoading({ active: false }));

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [handleRouteChangeStart, handleRouteChangeComplete, handleBeforePopState, dispatch]);

  return (
    <ThemeProvider theme={ThemeStyle}>
      <>
        <GlobalStyle
          vendorsStyle={[ noUiSliderCSS, simplebarCSS, tailwindCSS ]}
        />
        <Loading />
        <Header />
        <Search />
        <Wrapper>
          {children}
          <Footer />
        </Wrapper>
        <NewsletterModal />
        <NewsletterSuccessModal />
        <RegisterSuccessModal />
        <BuildingContactSuccess />
        <ContactSuccess />
        <WorkWithUsSuccess />
        <ContactModal />
        <ContactBar />
        <PrivacyPolicy
          onDemand
          active={
            router.query.modal === 'privacy-policy'
          }
        />
        <TermsOfUse
          onDemand
          active={
            router.query.modal === 'terms-of-use'
          }
        />
        <div
          className="onesignal-customlink-container"
          style={{ display: 'none' }}
        ></div>
      </>
    </ThemeProvider>
  );
}

export default Main;
