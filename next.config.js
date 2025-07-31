
const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nodeEnv = process.env.NODE_ENV || 'development';
const envConfig = JSON.parse(fs.readFileSync(`./config/${nodeEnv}.json`, 'utf-8'));

const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'admin.axpe.com.br',
      'images.axpe.com.br',
      'axpe.com.br',
      'www-hml.axpe.com.br',
      'axpe-frontend.vercel.app',
    ],
    formats: [ 'image/avif', 'image/webp' ],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compiler: {
    styledComponents: true,
  },

  async headers() {
    return [
      {
        source: '/static/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 100000,
        },
      },
      generator: {
        filename: 'static/chunks/[name].[hash][ext]',
      },
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.config': JSON.stringify(envConfig),
      })
    );

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      public: resolve(__dirname, './public'),
      assets: resolve(__dirname, './src/assets'),
      components: resolve(__dirname, './src/components'),
      helpers: resolve(__dirname, './src/helpers'),
      layouts: resolve(__dirname, './src/layouts'),
      pages: resolve(__dirname, './src/pages'),
      services: resolve(__dirname, './src/services'),
      store: resolve(__dirname, './src/store'),
    };

    return config;
  },
};

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    disable: nodeEnv === 'development',
    runtimeCaching,
    buildExcludes: [ /middleware-manifest\.json$/ ],
  },
});
