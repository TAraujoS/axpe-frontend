import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Wrapper = styled.div`
  width: 100%;
  min-height: ${props => (props.isVisible ? 'auto' : props.placeholderHeight)};
`;

const LazyLoad = ({ children, placeholderHeight }) => {
  const [ isVisible, setIsVisible ] = useState(false);
  const placeholderRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getPlaceholderHeight = () => {
    if (typeof placeholderHeight === 'string') {
      return placeholderHeight;
    }
    if (typeof placeholderHeight === 'object' && placeholderHeight !== null) {
      return isMobile ? placeholderHeight.mobile : placeholderHeight.desktop;
    }
    // Default values if nothing is provided
    return isMobile ? '650px' : '550px';
  };

  const finalPlaceholderHeight = getPlaceholderHeight();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px 0px', // Carrega um pouco antes de aparecer na tela
        threshold: 0.01,
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      if (placeholderRef.current) {
        observer.unobserve(placeholderRef.current);
      }
    };
  }, []);

  return (
    <Wrapper ref={placeholderRef} isVisible={isVisible} placeholderHeight={finalPlaceholderHeight}>
      {isVisible ? children : null}
    </Wrapper>
  );
};

export default LazyLoad;
