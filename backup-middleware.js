import { NextResponse } from 'next/server';

// Cache para evitar verificações repetidas
const avifCache = new Map();

export function middleware(request) {
  // Intercepta apenas requisições do Next.js Image Optimization
  if (request.nextUrl.pathname.startsWith('/_next/image')) {
    const imageUrl = request.nextUrl.searchParams.get('url');
    
    // Verifica se é uma imagem do admin.axpe.com.br
    if (imageUrl && imageUrl.includes('admin.axpe.com.br')) {
      try {
        // Extrai informações da URL original
        const originalUrl = decodeURIComponent(imageUrl);
        const urlObj = new URL(originalUrl);
        
        // Verifica se a URL termina com extensão de imagem
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
        const hasImageExtension = imageExtensions.some(ext => 
          urlObj.pathname.toLowerCase().endsWith(ext)
        );
        
        if (hasImageExtension) {
          // Constrói a URL do AVIF
          const pathWithoutExt = urlObj.pathname.replace(/\.(png|jpg|jpeg|webp)$/i, '');
          const avifUrl = `${urlObj.protocol}//${urlObj.host}${pathWithoutExt}.avif`;
          
          // Verifica se já está no cache
          if (avifCache.has(avifUrl)) {
            const cachedResult = avifCache.get(avifUrl);
            if (cachedResult) {
              console.log('AVIF encontrado no cache, redirecionando para:', avifUrl);
              return redirectToAvif(request, avifUrl);
            }
          }
          
          // Verifica se o AVIF existe no servidor externo
          return checkAvifExists(avifUrl).then(exists => {
            // Salva no cache
            avifCache.set(avifUrl, exists);
            
            if (exists) {
              console.log('AVIF encontrado, redirecionando para:', avifUrl);
              return redirectToAvif(request, avifUrl);
            } else {
              console.log('AVIF não encontrado, usando original');
              return NextResponse.next();
            }
          }).catch((error) => {
            console.log('Erro ao verificar AVIF:', error.message);
            avifCache.set(avifUrl, false); // Cache negativo
            return NextResponse.next();
          });
        }
      } catch (error) {
        console.log('Erro ao processar URL da imagem:', error.message);
        return NextResponse.next();
      }
    }
  }
  
  return NextResponse.next();
}

// Função para redirecionar para AVIF
function redirectToAvif(request, avifUrl) {
  const newParams = new URLSearchParams(request.nextUrl.searchParams);
  newParams.set('url', avifUrl);
  
  // Constrói a nova URL de forma segura
  const newUrl = new URL(request.url);
  newUrl.search = newParams.toString();
  
  return NextResponse.redirect(newUrl);
}

// Função para verificar se o arquivo AVIF existe
async function checkAvifExists(avifUrl) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 segundos de timeout
    
    const response = await fetch(avifUrl, { 
      method: 'HEAD',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log(`Timeout ao verificar AVIF: ${avifUrl}`);
    } else {
      console.log(`AVIF não encontrado: ${avifUrl}`);
    }
    return false;
  }
}

export const config = {
  matcher: '/_next/image/:path*',
}; 