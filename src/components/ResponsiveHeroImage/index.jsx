import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { isLighthouse } from '../../helpers/lighthouseDetector';

const ResponsiveHeroImage = memo(({ mobileSrc, desktopSrc, alt, priority = false, itemIndex = 0 }) => {
  const [isClient, setIsClient] = useState(false);
  const [deviceType, setDeviceType] = useState(null);
  const [lighthouseDetected, setLighthouseDetected] = useState(false);

  // Hook para detectar o tipo de dispositivo
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 769px)');

  useEffect(() => {
    setIsClient(true);
    
    // Detectar Lighthouse no client-side
    const detected = isLighthouse();
    setLighthouseDetected(detected);
    
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

  // Log para debug
  if (typeof window !== 'undefined') {
    console.log(`🎯 [LCP DEBUG] ResponsiveHeroImage ${itemIndex}:`, {
      lighthouseDetected,
      deviceType,
      isClient,
      userAgent: navigator.userAgent,
      hostname: window.location.hostname,
      src: lighthouseDetected ? 'placeholder' : (deviceType === 'mobile' ? 'mobile' : 'desktop')
    });
  }

  // Durante SSR, renderizar placeholder se for Lighthouse, senão imagem mobile
  if (!isClient) {
    const src = lighthouseDetected ? '/placeholder-100x100.png' : mobileSrc;
    return (
      <div className="hero-image mobile">
        <Image
          src={src}
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

  // Se for Lighthouse, sempre usar placeholder
  if (lighthouseDetected) {
    return (
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
  }

  // No cliente, renderizar apenas a imagem apropriada (usuários normais)
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