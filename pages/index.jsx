import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Api from 'services';
import SliderNew from 'components/SliderNew';

// actions
import { setMain } from 'store/modules/main/actions';

// helpers
import { shuffle } from 'helpers/utils';
import SeoData from 'helpers/seo';
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';

// components
import BuildingsPanel from 'components/BuildingsPanel';
import BlockHighlighted from 'components/BlockHighlighted';
import Tag from 'components/Tag';
import NewsletterFooter from 'components/NewsletterFooter';
import CategoryBannerVertical from 'components/CategoryBannerVertical';
import LazyLoad from 'components/LazyLoad';

// styles
import {
  Container,
  Banner,
  Hero,
  HeroItem,
  HeroLink,
  HeroItemWrapper,
  HeroItemInfo,
} from 'pages/Home/styles';
import CategorySection from '../src/components/CategorySection';
import ResponsiveHeroImage from '../src/components/ResponsiveHeroImage';

function Home({ heroItems, components }) {
  // eslint-disable-next-line no-console
  console.log('HomePage Version: 1.7 - Slick fix');
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { action },
  } = router;
  const [ buildingsSeen, setBuildingsSeen ] = useState([]);
  const [ buildingsForYou, setBuildingsForYou ] = useState([]);

  const heroSettings = (totalItems) => ({
    dots: true,
    infinite: true,
    fade: true,
    lazyLoad: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: i => (
      <span>
        { (i + 1) + ' / ' + totalItems }
      </span>
    ),
  });

  const renderComponents = useCallback((type, component) => {
    switch (type) {
      case 'banner': // INATIVO NO ADMIN
        return (
          <>
            <Banner
              href={component.link.url}
              target={component.link.external ? '_blank' : '_self'}
              mq="mobile"
              className="holos-home-banner"
              data-label="mobile-banner"
            >
              <img src={component.images.mobile} alt="Foto imóvel banner" loading='lazy'/>
            </Banner>
            <Banner
              href={component.link.url}
              target={component.link.external ? '_blank' : '_self'}
              mq="desktop"
              className="holos-home-banner"
              data-label="desktop-banner"
            >
              <img src={component.images.desktop} alt="Foto imóvel banner" loading='lazy'/>
            </Banner>
          </>
        );
      case 'category':
        return (
          <CategoryBannerVertical categoryItems={component.items}/>
        );
      case 'exclusivity':
        return (
          <LazyLoad placeholderHeight={{ mobile: '650px', desktop: '550px' }}>
            <Hero>
              <SliderNew
                type="full"
                arrowsColor="white"
                arrowsClassName="holos-home-exclusivity-arrow"
                settings={heroSettings(component.items.length)}
              >
                {component.items.map((item, itemIndex) => (
                  <HeroItem key={`exclusivity-item-${itemIndex}`}>
                    {item.link &&
                    item.link.url &&
                    (item.link.target === 'blank' ||
                      item.link.target === 'self') && (
                      <HeroLink
                        href={item.link.url}
                        target={`_${item.link.target}`}
                      >
                        {renderHeroItem(item, itemIndex)}
                      </HeroLink>
                    )}
                    {!item.link || !item.link.url ? renderHeroItem(item, itemIndex) : null}
                  </HeroItem>
                ))}
              </SliderNew>
            </Hero>
          </LazyLoad>
        );
        // case 'buildingsSquare':
      case 'buildingsGrid':
       return (
         <CategorySection items={component.items} />
       );
      case 'gallery':
        return (
          <LazyLoad placeholderHeight={{ mobile: '650px', desktop: '550px' }}>
            <Hero>
              <SliderNew
                type="full"
                arrowsColor="white"
                arrowsClassName="holos-home-gallery-arrow"
                settings={heroSettings(component.items.length)}
              >
                {component.items.map((item, itemIndex) => (
                  <HeroItem key={`gallery-item-${itemIndex}`}>
                    {item.link &&
                    (item.link_type === 'blank' ||
                      item.link_type === 'self') && (
                      <HeroLink
                        href={item.link}
                        target={`_${item.link_type}`}
                      >
                        {renderHeroItem(item, itemIndex)}
                      </HeroLink>
                    )}
                    {!item.link ? renderHeroItem(item, itemIndex) : null}
                  </HeroItem>
                ))}
              </SliderNew>
            </Hero>
          </LazyLoad>
        );
        case 'highlights':
          return (
            <LazyLoad placeholderHeight={{ mobile: '650px', desktop: '550px' }}>
              <Hero>
                <SliderNew
                  type="full"
                  arrowsColor="white"
                  arrowsClassName="holos-home-highlights-arrow"
                  settings={heroSettings(component.items.length)}
                >
                  {component.items.map((item, itemIndex) => (
                    <HeroItem key={`highlights-item-${itemIndex}`}>
                      {item.link &&
                      item.link.url &&
                      (item.link.target === 'blank' ||
                        item.link.target === 'self') && (
                        <HeroLink
                          href={item.link.url}
                          target={`_${item.link.target}`}
                        >
                          {renderHeroItem(item, itemIndex)}
                        </HeroLink>
                      )}
                      {!item.link || !item.link.url ? renderHeroItem(item, itemIndex) : null}
                    </HeroItem>
                  ))}
                </SliderNew>
              </Hero>
            </LazyLoad>
          );
      case 'contact':
        return (
        <>
          <NewsletterFooter/>
          <BlockHighlighted type="contactHome" />
        </>
      );
    }
  }, []);

  const renderHeroItem = (item, itemIndex) => {
    const hasContent = item.title || item.content || item.text ? true : false;
    const itemLink = item.link ? item.link : item.link.url
    const itemContent = item.content ? item.content : item.text
    
    return (
      <HeroItemWrapper hasContent={hasContent}>
        <ResponsiveHeroImage
          mobileSrc={item.images.mobile}
          desktopSrc={item.images.desktop}
          alt={item.title}
          priority={itemIndex === 0}
          itemIndex={itemIndex}
        />
        {hasContent && (
          <HeroItemInfo className="hero-info">
            {item.label && item.label == 'isExclusive' ? (
              <Tag label={'Exclusividade'} icon="check" color="orange" />
            ) : item.label == 'isNew' ? (
              <Tag label={'Novidade'} icon="star" color="blueLight" />
            ) : item.label == 'isFurnished' ? (
              <Tag label={'Mobiliado'} icon="sofa" color="greenLight" />
            ) : null}
            {item && item.title && (
              <h2 className={item.title && item.content && 'with-separator'}>
                {item.title}
              </h2>
            )}
            {itemContent && <p>{itemContent}</p>}
            {itemLink && <span>Saiba mais</span>}
          </HeroItemInfo>
        )}
      </HeroItemWrapper>
    );
  };

  useEffect(() => {
    function checkActionParams() {
      if (action) {
        dispatch(
          setMain({
            modalPasswordNew: true,
          })
        );
      }
    }

    async function loadBuildinsSeen() {
      const buildingsSeenCookie = CookieBuildingSeen.get();

      if (!buildingsSeenCookie.length) return false;

      const listBuildingsSeen = await Api.Search.getBuildings(
        `?reference=${buildingsSeenCookie.join(',')}`
      );
      const listForYou = await Api.Building.getSimilar(
        listBuildingsSeen.data[0],
        10
      );
      const filteredList = listBuildingsSeen.data.filter(
        (item, index, self) =>
          index === self.findIndex(b => b.reference === item.reference)
      );
      setBuildingsSeen(filteredList);

      if (listForYou && listForYou.total) {
        setBuildingsForYou(listForYou.data);
      }
    }

    checkActionParams();
    loadBuildinsSeen();
  }, []);

  return (
    <>
      <Head>
        <title>{SeoData.title}</title>
        <meta name="description" content={SeoData.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.axpe.com.br/" />
      </Head>
      <Container>
        <h1 className="sr-only">
          Axpe | Imóveis especiais São Paulo
        </h1>
        <Hero>
          <SliderNew
            type="full"
            arrowsColor="white"
            arrowsClassName="holos-home-hero-arrow"
            settings={heroSettings(heroItems.length)}
          >
            {heroItems.map((item, itemIndex) => (
              <HeroItem key={`hero-item-${itemIndex}`}>
                {item.link &&
                  item.link.url &&
                  (item.link.target === 'blank' ||
                    item.link.target === 'self') && (
                    <HeroLink
                      href={item.link.url}
                      target={`_${item.link.target}`}
                    >
                      {renderHeroItem(item, itemIndex)}
                    </HeroLink>
                  )}
                {!item.link || !item.link.url ? renderHeroItem(item, itemIndex) : null}
              </HeroItem>
            ))}
          </SliderNew>
        </Hero>

        {components &&
          components.length > 0 &&
          components.map((c, cIndex) => {
            if (c.type === 'buildingsSeen') {
              return buildingsSeen && buildingsSeen.length ? (
                <BuildingsPanel
                  itemClass="buildingsSeen"
                  key={`buildingspanel-0-${c.type}-${cIndex}`}
                  page="home"
                  title="Imóveis que você viu"
                  buildingLayout="vertical"
                  data={buildingsSeen}
                />
              ) : null;
            } else if (c.type === 'buildingsForYou') {
              return buildingsForYou && buildingsForYou.length ? (
                <BuildingsPanel
                  itemClass="buildingsForYou"
                  key={`panel-buildings-1-${c.type}-${cIndex}`}
                  page="home"
                  title="Indicados para você"
                  buildingLayout="vertical"
                  data={buildingsForYou}
                />
              ) : null;
            }
            return (
              <Fragment key={`fragment-2-${c.type}-${cIndex}`}>
                {renderComponents(c.type, c)}
              </Fragment>
            );
          })}
      </Container>
    </>
  );
}

Home.getInitialProps = async () => {
  const response = await Api.Home.getPage();
  const components = response.components;
  const heroItems = shuffle(response.hero);
  return { heroItems, components };
};

export default Home;
