const path = require('path');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const isProd = process.env.NODE_ENV === 'production';
let config = isProd ? require('./webpack.prod.js') : require('./webpack.dev.js')

module.exports = merge(config, {
    mode: isProd ? 'production':'development',
    entry: {
        app: path.resolve(__dirname, '../src/enter-client.js')
    },
    plugins: [
        new VueSSRClientPlugin(),
    ]
});