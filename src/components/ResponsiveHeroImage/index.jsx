import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ResponsiveHeroImage = memo(({ mobileSrc, desktopSrc, alt, priority = false, itemIndex = 0 }) => {
  const [isClient, setIsClient] = useState(false);
  const [deviceType, setDeviceType] = useState(null);

  // Hook para detectar o tipo de dispositivo
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 769px)');

  useEffect(() => {
    setIsClient(true);
    
    // Determinar o tipo de dispositivo imediatamente
    if (isMobile) {
      setDeviceType('mobile');
    } else if (isDesktop) {
      setDeviceType('desktop');
    } else {
      // Fallback para mobile se não conseguir detectar
      setDeviceType('mobile');
    }
  }, [isMobile, isDesktop]);

  // Durante SSR, renderizar apenas a imagem mobile como fallback
  if (!isClient) {
    return (
      <div className="hero-image mobile">
        <Image
          src={mobileSrc}
          alt={alt}
          layout='fill'
          priority={priority}
          sizes="(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px"
          objectFit="cover"
          quality={65}
        />
      </div>
    );
  }

  // No cliente, renderizar apenas a imagem apropriada
  if (deviceType === 'mobile') {
    return (
      <div className="hero-image mobile">
        <Image
          src={mobileSrc}
          alt={alt}
          layout='fill'
          priority={priority}
          sizes="(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px"
          objectFit="cover"
          quality={65}
        />
      </div>
    );
  }

  if (deviceType === 'desktop') {
    return (
      <div className="hero-image desktop">
        <Image
          src={desktopSrc}
          alt={alt}
          layout='fill'
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1280px"
          objectFit="cover"
          quality={65}
        />
      </div>
    );
  }

  // Fallback caso não detecte o dispositivo
  return (
    <div className="hero-image mobile">
      <Image
        src={mobileSrc}
        alt={alt}
        layout='fill'
        priority={priority}
        sizes="(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px"
        objectFit="cover"
        quality={65}
      />
    </div>
  );
});

ResponsiveHeroImage.displayName = 'ResponsiveHeroImage';

export default ResponsiveHeroImage;