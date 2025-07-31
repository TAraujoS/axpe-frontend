import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: ${props => (props.isVisible ? 'auto' : props.placeholderHeight)};
`;

const LazyLoad = ({ children, placeholderHeight = '500px' }) => {
  const [ isVisible, setIsVisible ] = useState(false);
  const placeholderRef = useRef(null);

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
    <Wrapper ref={placeholderRef} isVisible={isVisible} placeholderHeight={placeholderHeight}>
      {isVisible ? children : null}
    </Wrapper>
  );
};

export default LazyLoad;
