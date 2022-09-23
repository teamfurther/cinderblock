const mix = require('laravel-mix');

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

mix.ts('src/js/index.ts', 'dist/js')
    .vue({
        extractStyles: true,
        globalStyles: 'src/scss/global.scss'
    })
    .setPublicPath('./dist');

mix.options({
    uglify: false
});

mix.webpackConfig({
    output: {
        library: '@teamfurther/cinderblock',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
});

// Only do cache-busting in production
if (mix.inProduction()) {
    mix.version();
}