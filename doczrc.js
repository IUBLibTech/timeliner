const path = require('path');
const webpack = require('webpack');

export default {
  title: 'Timeliner',
  repository: "https://github.com/IUBLibTech/timeliner",
  description: 'IIIF Timeliner Documentation',
  base: process.env.DOCZ_BASE || '/docs',
  dest: './dist/docs',
  src: './src',
  wrapper: 'src/components/docs/components/DocsWrapper/DocsWrapper',
  files: '**/*.{md,markdown,mdx}',
  menu: [
    'Getting started',
    'User stories',
    'Technical Documentation',
  ],
  onCreateWebpackChain(config) {
    // Force all imports of 'docz' to resolve to the same copy so that the
    // shared React context is a single instance.
    config.resolve.alias.set(
      'docz',
      path.resolve(__dirname, 'node_modules/docz')
    );
    // Add SCSS support
    config.module
      .rule('scss')
      .test(/\.scss$/)
      .use('style-loader')
      .loader('style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .options({ sourceMap: false })
      .end()
      .use('sass-loader')
      .loader('sass-loader')
      .options({
        implementation: require('sass'),
        sourceMap: false,
      })
      .end();

    // Plain CSS files (e.g. from third-party imports)
    config.module
      .rule('css')
      .test(/\.css$/)
      .use('style-loader')
      .loader('style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .options({ sourceMap: false })
      .end();

    // Expose VITE_DOCS to the docz/webpack bundle for conditional rendering in DocsWrapper
    config
      .plugin('define')
      .use(webpack.DefinePlugin, [{
        'process.env.VITE_DOCS': JSON.stringify(process.env.VITE_DOCS)
      }]);

    return config;
  },
};
