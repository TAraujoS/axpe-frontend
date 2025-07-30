# Otimização de Imagens - Next.js

## Configurações Implementadas

### 1. Device Sizes (next.config.js)

```javascript
deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]
```

**Tamanhos disponíveis no srcset:**
- `375px` - Dispositivos móveis pequenos (iPhone SE, etc.)
- `640px` - Dispositivos móveis médios
- `750px` - Dispositivos móveis grandes
- `828px` - Tablets pequenos
- `1080px` - Tablets médios
- `1200px` - Tablets grandes
- `1920px` - Desktops padrão
- `2048px` - Desktops grandes
- `3840px` - 4K displays

### 2. Image Sizes (next.config.js)

```javascript
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
```

**Para imagens com tamanho fixo (ícones, thumbnails, avatares)**

### 3. Sizes Attribute (ResponsiveHeroImage)

**Para imagens mobile:**
```javascript
sizes="(max-width: 375px) 375px, (max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px"
```

**Para imagens desktop:**
```javascript
sizes="(max-width: 768px) 100vw, 1280px"
```

**Nota:** O `sizes` específico garante que o navegador escolha a imagem correta para cada tamanho de tela.

## Como Funciona

### DeviceSizes (para imagens responsivas)
- Usado com `layout="fill"` ou `layout="responsive"`
- Para hero images, banners, imagens que ocupam largura total
- **375px**: Dispositivos com largura até 375px carregam imagem de 375px
- **640px**: Dispositivos com largura até 640px carregam imagem de 640px
- **E assim por diante...**

### ImageSizes (para imagens fixas)
- Usado com `layout="fixed"` ou `layout="intrinsic"`
- Para ícones, thumbnails, avatares, imagens com tamanho fixo
- **16px**: Ícones pequenos
- **32px**: Ícones médios
- **64px**: Thumbnails pequenos
- **128px**: Thumbnails médios
- **256px**: Avatares grandes
- **384px**: Imagens de destaque

## Benefícios

- ✅ **Performance**: Carrega apenas a imagem necessária
- ✅ **Qualidade**: Imagem otimizada para cada tamanho de tela
- ✅ **Bandwidth**: Economia de dados para usuários móveis
- ✅ **LCP**: Melhora o Largest Contentful Paint

## Exemplo de Uso

```jsx
<ResponsiveHeroImage
  mobileSrc="imagem-mobile.jpg"
  desktopSrc="imagem-desktop.jpg"
  alt="Descrição da imagem"
  priority={itemIndex === 0}
/>
```

## Formatos Suportados

- ✅ AVIF (mais moderno e eficiente)
- ✅ WebP (bom suporte)
- ✅ JPEG/PNG (fallback) 