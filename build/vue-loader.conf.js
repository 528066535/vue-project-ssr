const styleLoader = require('./style-loader');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    name: 'pages/[name]/',
    loaders: styleLoader.cssLoader({
        sourceMap: !isProd,
        extract: isProd,
    }),
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href']
    }
};