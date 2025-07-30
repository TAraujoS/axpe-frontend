import React, { memo } from 'react';
import Image from 'next/image';
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

  if (!isClient) {
    // SSR: renderiza ambas as imagens com CSS para esconder uma
    return (
      <>
        <div className="hero-image mobile">
          <Image
            src={mobileSrc}
            alt={alt}
            layout='fill'
            priority={priority}
            sizes="(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px"
            objectFit="cover"
          />
        </div>
        <div className="hero-image desktop">
          <Image
            src={desktopSrc}
            alt={alt}
            layout='fill'
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1280px"
            objectFit="cover"
          />
        </div>
      </>
    );
  }

  // Cliente: renderiza apenas a imagem apropriada
  if (isMobile) {
    return (
      <div className="hero-image mobile">
        <Image
          src={mobileSrc}
          alt={alt}
          layout='fill'
          priority={priority}
          sizes="(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px"
          objectFit="cover"
        />
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div className="hero-image desktop">
        <Image
          src={desktopSrc}
          alt={alt}
          layout='fill'
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1280px"
          objectFit="cover"
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
      />
    </div>
  );
});

ResponsiveHeroImage.displayName = 'ResponsiveHeroImage';

export default ResponsiveHeroImage;