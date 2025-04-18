import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';

// styles
import { Container } from './styles';

function SliderNew({
  children,
  arrowsColor = 'white',
  hasVerticalBar = false,
  type = 'full',
  arrowsClassName = '',
  onChange,
  settings = {
    dots: false,
    infinite: false,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  },
}) {
  const ref = useRef(null);

  const afterChange = () => {
    setTimeout(() => {
      const $list = ref.current.innerSlider.list;
      const $track = $list.querySelector('.slick-track');
      const $items = $list.querySelectorAll('.slick-slide');

      $items.forEach(($item) => {
        if ($item.classList.contains('slick-active')) {
          $item.classList.add('active');
        } else {
          $item.classList.remove('active');
        }
      });

      setTimeout(() => {
        if ($track && $track.style && settings.slidesToShow >= $items.length) {
          $track.style.height = '';
        }
      }, 400);
    }, 100);

    if (typeof onChange === 'function') {
      onChange(ref.current.innerSlider.state.currentSlide);
    }
  };

  useEffect(() => {
    if (ref.current && ref.current.innerSlider) {
      const $list = ref.current.innerSlider.list;

      if (!$list) return false;

      const $buttonPrev = $list.previousSibling;
      const $buttonNext = $list.nextSibling;
      const renderSVG = (type) => `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
          <mask id="slidernew-arrow-${type}" mask-type="alpha" maskUnits="userSpaceOnUse" x="6" y="2" width="12" height="20">
            <path d="M6 4.35L13.417 12L6 19.65L8.2834 22L18 12L8.2834 2L6 4.35Z" fill="white"/>
          </mask>
          <g mask="url(#slidernew-arrow-${type})">
            <rect width="24" height="24" transform="matrix(1 0 0 -1 0 24)" fill="#37474F"/>
          </g>
        </svg>
      `;

      if ($buttonPrev && $buttonPrev.tagName === 'BUTTON') {
        if (arrowsClassName) {
          $buttonPrev.classList.add(arrowsClassName);
        }
        $buttonPrev.setAttribute('data-direction', 'anterior');
        $buttonPrev.innerHTML = renderSVG('prev');
      }

      if ($buttonNext && $buttonNext.tagName === 'BUTTON') {
        if (arrowsClassName) {
          $buttonNext.classList.add(arrowsClassName);
        }
        $buttonNext.setAttribute('data-direction', 'próximo');
        $buttonNext.innerHTML = renderSVG('next');
      }

      afterChange();
    }
  }, []);

  return (
    <Container
      type={type}
      arrowsColor={arrowsColor}
      hasVerticalBar={hasVerticalBar}
    >
      <Slider
        {...settings}
        afterChange={afterChange}
        beforeChange={onChange}
        ref={ref}
      >
        {children}
      </Slider>
    </Container>
  );
}

export default SliderNew;
