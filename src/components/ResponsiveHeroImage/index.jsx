import React, { memo } from 'react';
// import Image from 'next/image';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ResponsiveHeroImage = memo(({ mobileSrc, desktopSrc, alt, priority = false, itemIndex = 0 }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 769px)');

  // Durante o SSR, renderizamos ambas as imagens mas escondemos uma com CSS
  // No cliente, após a hidratação, renderizamos apenas a apropriada
  const [ isClient, setIsClient ] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Função para gerar URL AVIF
  const getAvifUrl = (originalUrl) => {
    if (!originalUrl || !originalUrl.includes('admin.axpe.com.br')) {
      return null;
    }
    
    try {
      const urlObj = new URL(originalUrl);
      const pathWithoutExt = urlObj.pathname.replace(/\.(png|jpg|jpeg|webp)$/i, '');
      return `${urlObj.protocol}//${urlObj.host}${pathWithoutExt}.avif`;
    } catch {
      return null;
    }
  };

  // Função para renderizar imagem com fallback AVIF
  const renderImageWithFallback = (src, sizes, className) => {
    const avifUrl = getAvifUrl(src);
    
    if (avifUrl) {
      return (
        <picture>
          <source srcSet={avifUrl} type="image/avif" />
          <img
            src={src}
            alt={alt}
            className={className}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 100ms 500ms ease',
              willChange: 'transform',
              contain: 'paint'
            }}
          />
        </picture>
      );
    }
    
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'all 100ms 500ms ease',
          willChange: 'transform',
          contain: 'paint'
        }}
      />
    );
  };

  if (!isClient) {
    // SSR: renderiza ambas as imagens com CSS para esconder uma
    return (
      <>
        <div className="hero-image mobile">
          {renderImageWithFallback(mobileSrc, "(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px", "next-image")}
        </div>
        <div className="hero-image desktop">
          {renderImageWithFallback(desktopSrc, "(max-width: 768px) 100vw, 1280px", "next-image")}
        </div>
      </>
    );
  }

  // Cliente: renderiza apenas a imagem apropriada
  if (isMobile) {
    return (
      <div className="hero-image mobile">
        {renderImageWithFallback(mobileSrc, "(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px", "next-image")}
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div className="hero-image desktop">
        {renderImageWithFallback(desktopSrc, "(max-width: 768px) 100vw, 1280px", "next-image")}
      </div>
    );
  }

  // Fallback caso não detecte o dispositivo
  return (
    <div className="hero-image mobile">
      {renderImageWithFallback(mobileSrc, "(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px", "next-image")}
    </div>
  );
});

ResponsiveHeroImage.displayName = 'ResponsiveHeroImage';

export default ResponsiveHeroImage;