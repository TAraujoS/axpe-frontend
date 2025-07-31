import React, { useEffect } from 'react';
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

  useEffect(() => {
    // scroll issue related here https://github.com/zeit/next.js/issues/3303
    const cachedPageHeight = [];
    const html = document.querySelector('html');

    Router.events.on('routeChangeStart', (a) => {
      cachedPageHeight.push(document.documentElement.offsetHeight);
      dispatch(
        setMain({
          searchFormActive: false,
          headerHiding: false,
        })
      );
      dispatch(setLoading({ active: true }));
    });

    Router.events.on('routeChangeComplete', () => {
      html.style.height = 'initial';
      dispatch(setLoading({ active: false }));
      if (location && location.pathname.search('busca') < 0) {
        window.scrollTo(0, 0);
      }
    });

    Router.beforePopState(() => {
      html.style.height = `${cachedPageHeight.pop()}px`;
      return true;
    });

    // window.addEventListener('beforeinstallprompt', (e) => {
    //   e.preventDefault();
    //   console.log('exibir botão para adicionar app na home!')
    // });

    dispatch(setLoading({ active: false }));
  }, []);

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
            router.query.modal &&
            router.query.modal === 'politica-de-privacidade'
          }
        />
        <TermsOfUse
          onDemand
          active={router.query.modal && router.query.modal === 'termos-de-uso'}
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
