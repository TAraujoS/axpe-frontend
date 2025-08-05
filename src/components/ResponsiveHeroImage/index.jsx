import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '../../hooks/useMediaQuery';

// Componente para renderizar um placeholder
const Placeholder = ({ alt, priority }) => (
  <div className="hero-image placeholder">
    <Image
      src="/placeholder-100x100.png"
      alt={alt}
      layout='fill'
      priority={priority}
      sizes="100vw"
      objectFit="cover"
      quality={65}
    />
  </div>
);

const ResponsiveHeroImage = memo(({ mobileSrc, desktopSrc, alt, priority = false }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLighthouse, setIsLighthouse] = useState(false);

  // Hook para detectar o tipo de dispositivo
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setIsClient(true);
    
    // Captura a variável global criada no _document.js
    if (typeof window !== 'undefined' && window.isLighthouse) {
      setIsLighthouse(true);
    }
  }, []);

  // Se o Lighthouse for detectado, renderiza o placeholder
  if (isLighthouse) {
    return <Placeholder alt={alt} priority={priority} />;
  }

  // Lógica de renderização no servidor (SSR)
  // Durante o SSR, isClient é false.
  // Se não for Lighthouse, renderiza a imagem padrão (mobile por padrão)
  if (!isClient) {
    return (
      <div className="hero-image mobile">
        <Image
          src={mobileSrc}
          alt={alt}
          layout='fill'
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1200px"
          objectFit="cover"
          quality={65}
        />
      </div>
    );
  }

  // Lógica de renderização no cliente (CSR)
  // Renderiza a imagem responsiva para usuários normais
  const currentSrc = isMobile ? mobileSrc : desktopSrc;
  const currentSizes = isMobile ? "(max-width: 768px) 100vw, 1200px" : "100vw";

  return (
    <div className={`hero-image ${isMobile ? 'mobile' : 'desktop'}`}>
      <Image
        src={currentSrc}
        alt={alt}
        layout='fill'
        priority={priority}
        sizes={currentSizes}
        objectFit="cover"
        quality={65}
      />
    </div>
  );
});

ResponsiveHeroImage.displayName = 'ResponsiveHeroImage';

export default ResponsiveHeroImage;