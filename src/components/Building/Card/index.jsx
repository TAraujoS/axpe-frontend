import React, { useCallback, useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';

// helpers
import { Link } from 'helpers/routes';
import { formatCurrency } from 'helpers/utils';

// assets
import EmojiIconSVG from 'assets/icons/emoji';

// styles
import {
  Container,
  LinkTag,
  Wrapper,
  Gallery,
  Image,
  Column,
  Text,
  Inactive,
  GallerySlider
} from './styles';

function BuildingCard({
  layout = 'vertical',
  gtmShowcase = '',
  positionIndex = 1,
  item,
  showGallery = false,
}) {
  const [ gtmObj, setGtmObj ] = useState(null);
  const itemData =
  item && item.building && Object.keys(item.building).length > 0
  ? item.building
  : item;

  const { category, values, infos, address, status } = itemData;

  const infoDescription = infos && infos.shortDescription || infos && infos.titleSite;
  const charDescriptionLimit = 70;

  const sell =
    values && Object.keys(values).length > 0 && values.sell
      ? parseInt(values.sell)
      : '';

  const release =
    values && Object.keys(values).length > 0 && values.release
      ? parseInt(values.release)
      : '';

  const rent =
    values && Object.keys(values).length > 0 && values.rent
      ? parseInt(values.rent)
      : '';

  const renderGalleryImages = useCallback(() => {
    const urlImageDesktop =
      itemData.images && itemData.images.desktop
        ? itemData.images.desktop
        : itemData.imageFeatured
        ? itemData.imageFeatured.desktop
        : '';

    const urlImageMobile =
      itemData.images && itemData.images.mobile
        ? itemData.images.mobile
        : itemData.imageFeatured
        ? itemData.imageFeatured.mobile
        : '';

        if (showGallery && itemData.gallery && itemData.gallery.length > 0) {
          return (
            <GallerySlider layout={layout}>
              {itemData.gallery.map((image, index) => (
                <>
                  <Image mq="mobile" src={image.src} alt={`Slide ${index + 1}`} />
                  <Image mq="desktop" src={image.src} alt={`Slide ${index + 1}`} />
                </>
              ))}
            </GallerySlider>
          );
        } else if (urlImageDesktop || urlImageMobile) {
          return (
            <Gallery layout={layout}>
              {status === 'inactive' && (
                <Inactive>
                  <SVG src={EmojiIconSVG} uniquifyIDs={true} />
                  <p>
                    <strong>Ops!</strong>
                    <br />
                    Esse imóvel não está mais disponível
                  </p>
                </Inactive>
              )}
              {urlImageDesktop && <Image mq="desktop" src={urlImageDesktop} />}
              {urlImageMobile && <Image mq="mobile" src={urlImageMobile} />}
            </Gallery>
          );
        } else {
          return null;
        }
      }, [ showGallery, layout, itemData, status ]);
  const renderHTML = useCallback(() => {
    return (
      <Wrapper layout={layout}>
        {renderGalleryImages()}
        <Column layout={layout}>
          <Text layout={layout}>
            <span>
              {sell
                ? formatCurrency.format(sell)
                : release ? formatCurrency.format(release) : rent ? formatCurrency.format(rent) : ' '}
            </span>
            <p>{category}</p>
            <h4>{address && address.local ? address.local : ''}</h4>
            <div>
              <span>{infos && infos.areaUseful &&`${infos.areaUseful} m² |`} </span>
              <span>{infos && infos.suites && `${infos.suites} Suites |`}</span>
              <span>{infos && infos.bedrooms && `${infos.bedrooms} Quartos |`}</span>
              <span>{infos && infos.parking && `${infos.parking} Vagas`}</span>
            </div>
            <p>{infoDescription.length > charDescriptionLimit
              ? `${infoDescription.slice(0, charDescriptionLimit)}...`
              : infoDescription}
            </p>
            
          </Text>
        </Column>
      </Wrapper>
    );
  }, [ layout, itemData ]);

  useEffect(() => {
    const obj = gtmShowcase
      ? {
          className: 'holos-home-product',
          showcase: gtmShowcase,
          productId: itemData.reference
        }
      : null;

    if (gtmShowcase) {
      if(gtmShowcase === 'Imóvel Recente') {
        obj.className = 'holos-account-product';
      } else if(gtmShowcase.search('pronto para morar') >= 0) {
        obj.className = 'holos-search-product';
        obj.showcase = 'Imóveis Prontos';
      } else if(gtmShowcase.search('não estão prontos') >= 0) {
        obj.className = 'holos-search-product';
        obj.showcase = 'Imóveis Lançamentos';
      } else if(gtmShowcase.search('bairros vizinhos') >= 0) {
        obj.className = 'holos-search-product';
        obj.showcase = 'Imóveis Bairros Vizinhos';
      } else if(gtmShowcase.search('valor passou um pouco') >= 0) {
        obj.className = 'holos-search-product';
        obj.showcase = 'Imóveis Preço Acima';
      }
    }

    setGtmObj(obj);
  }, [ gtmShowcase ]);

  return (
    <Container layout={layout}>
      {status !== 'inactive' ? (
        <Link route={`/${itemData.slug}`} passHref>
          <LinkTag
            layout={layout}
            className={gtmObj ? gtmObj.className : ''}
            data-showcase={gtmObj ? gtmObj.showcase : ''}
            data-product-id={gtmObj ? gtmObj.productId : ''}
            data-position={positionIndex}
          >
            {renderHTML()}
          </LinkTag>
        </Link>
      ) : (
        renderHTML()
      )}
    </Container>
  );
}

export default BuildingCard;
