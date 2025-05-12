/** @type {import('next').NextConfig} */
const { resolve } = require('path');
const webpack = require('webpack');
const withPWA = require('next-pwa');
const envConfig = require(`./config/${process.env.NODE_ENV}.json`);

module.exports = withPWA(
  {
    images: {
      domains: [ 'admin.axpe.com.br', 'images.axpe.com.br', 'axpe.com.br', 'adminaxpe.wicomm.com.br' ],
      formats: [ 'image/avif', 'image/webp' ],
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
  },
  {
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
    },
  }
);