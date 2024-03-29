const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');
const styleLoader = require('./style-loader');

module.exports = merge(base, {
    mode: isProd ? 'production':'development',
    output: {
        libraryTarget: 'commonjs2'
    },

    resolve: {
        alias: {

        }
    },

    target: 'node',
    entry: {
        // css: path.resolve(__dirname,'../src/resource/css/index.js'),
        server: path.resolve(__dirname, '../src/enter-server.js')
    },

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    }),

    module: {
        rules: styleLoader.styleLoader({
            extract: isProd,
            sourceMap: !isProd
        })
    },

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"server"'
            }
        }),
    ]
});