let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.ts('src/js/index.ts', 'dist/js').sourceMaps()
    .setPublicPath('./dist');

mix.options({
    extractVueStyles: true,
    globalVueStyles: 'src/scss/global.scss'
});

mix.webpackConfig({
    output: {
        library: '@further/cinderblock',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
});

// Only do cache-busting in production
if (mix.inProduction()) {
    mix.version();
}