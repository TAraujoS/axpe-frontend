import React from 'react';
import PropTypes from 'prop-types';

// components
import Section from 'components/Section';

// styles
import {
  Container,
  ItemLink,
  Slide,
  Image,
  Row1,
  Row2,
  ImagesGrid,
  GreenBlock,
  Gradient
} from './styles';

function renderBackground(type, item) {
  switch (type) {
    case 'slickGrid':
      return (
        <>
          <ImagesGrid>
            <Row1>
              <GreenBlock>
                <p>{item.titleGreen}</p>
              </GreenBlock>
              <Image type={type} mq="desktop" src={item.images.desktop1} />
            </Row1>
            <Row2>
              <Image type={type} mq="desktop" src={item.images.desktop2} />
              <Image type={type} mq="desktop" src={item.images.desktop3} />
            </Row2>
          </ImagesGrid>
          <Image type={type} mq="mobile" src={item.images.mobile} />
        </>
      );
    default:
      const urlImageDesktop =
        item.images && item.images.desktop
          ? item.images.desktop
          : item.building &&
            item.building.imageFeatured &&
            item.building.imageFeatured
          ? item.building.imageFeatured.desktop
          : item.imageFeatured
          ? item.imageFeatured.desktop
          : '';
      const urlImageMobile =
        item.images && item.images.mobile
          ? item.images.mobile
          : item.building &&
            item.building.imageFeatured &&
            item.building.imageFeatured
          ? item.building.imageFeatured.mobile
          : item.imageFeatured
          ? item.imageFeatured.mobile
          : '';
      return (
        <>
          <Image type={type} mq="desktop" src={urlImageDesktop} />
          <Image type={type} mq="mobile" src={urlImageMobile} />
        </>
      );
  }
}

function SlickSection({
  type = 'slick',
  items = [],
  color,
  name,
  useGradient = false,
  className
}) {
  let slidesToShow = 1;
  let rows = 1;
  let slidesPerRow = 1;
  const lengthItems = items.length;

  if (type === 'slickLarge') {
    rows = 2;
    slidesPerRow = 1;
  }

  if (type === 'slickSmall') {
    slidesToShow = lengthItems >= 3 ? 3 : lengthItems;
  }

  const responsive = {
    slickSmall: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: lengthItems >= 3 ? 3 : lengthItems
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ],
    slickLarge: [
      {
        breakpoint: 769,
        settings: {
          rows: 2,
          slidesToShow: 2,
          slidesPerRow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          rows: 1
        }
      }
    ]
  };

  return (
    <Container
      className={className}
      type={type}
      length={lengthItems}
      slidesToShow={slidesToShow}
      slidesPerRow={slidesPerRow}
      rows={rows}
      responsive={responsive[type]}
      autoplay={true}
      propsArrow={{
        typeSection: type,
        color: color,
        type: [ 'slick', 'slickLeft', 'slickGrid' ].includes(type)
          ? 'together'
          : '',
        position: (() => {
          if (type === 'slickGrid') return 'right';
          if (type === 'slick') return 'together';
          if (type === 'slickLeft') return 'left';
          if (type === 'slickLarge') return 'large';
          if (type === 'slickSmall') return 'small';
          return 'outside';
        })()
      }}
    >
      {items &&
        lengthItems > 0 &&
        items.map((item, slideIndex) => (
          <Slide key={`slide-${type}-${slideIndex}`} type={type}>
            {item.link && !!item.link.url ? (
              <ItemLink
                type={type}
                {...item.link}
                route={item.link.url}
              />
            ) : (
              <ItemLink
                type={type}
                route={item.building ? `/${item.building.slug}` : `/${item.slug}`}
                className="holos-home-product"
                data-showcase="Carrossel de Produtos"
                data-product-id={item.building ? `${item.building.reference}` : `${item.reference}`}
                data-position={slideIndex + 1}
              />
            )}

            {(!name && useGradient) || (name && name === 'hero' && (item.title || item.content) && useGradient) && <Gradient />}
            {renderBackground(type, item)}
            <Section type={type} item={item} />
          </Slide>
        ))}
    </Container>
  );
}

SlickSection.propTypes = {
  type: PropTypes.oneOf([
    'slick',
    'slickLeft',
    'slickGrid',
    'slickLarge',
    'slickSmall'
  ]),
  items: PropTypes.array.isRequired
};

export default SlickSection;
