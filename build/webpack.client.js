const path = require('path');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
let config = require('./webpack.base.js');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin")

const styleLoader = require('./style-loader');

let plugins = [
    new VueSSRClientPlugin(),

    //显示模块相对路径
    new webpack.NamedModulesPlugin(),
    //配置html入口信息
];

if (!isProd) {
    plugins.push(
            //开启HMR(热替换功能,替换更新部分,不重载页面！)
            new webpack.HotModuleReplacementPlugin(),
    );

    plugins.push(
            new HtmlWebpackPlugin({
                // chunks: ["app","css"],
                filename: 'home.html',
                template: path.resolve(__dirname, '../src/resource/template/index.html'),
                inject: 'body',
                title: '测试',
                hash: false
            }),
    );
}
else {
    plugins.push(
            new HtmlWebpackPlugin({
                // excludeChunks: ['server'],
                filename: 'home.html',
                template: path.resolve(__dirname, '../src/resource/template/index.html'),
                inject: 'body',
                title: '测试',
                hash: true,
                minify: {
                    // 删除Html注释
                    // removeComments: true,
                    //去除空格
                    collapseWhitespace: true,
                    //去除属性引号
                    removeAttributeQuotes: true
                }
            }),
    )
}

module.exports = merge(config, {
    devtool: isProd ? 'cheap-module-eval-source-map' : 'inline-source-map',
    entry: {
        client: path.resolve(__dirname, '../src/enter-client.js'),
        // css: path.resolve(__dirname, '../src/resource/css/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: styleLoader.styleLoader({extract: isProd, sourceMap: !isProd})
    },
    plugins: plugins
});