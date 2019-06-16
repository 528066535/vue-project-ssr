const webpack = require('webpack');
const styleLoader = require('./style-loader');
const baseConf = require('./webpack.base.js');

//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require("webpack-merge");
const path = require("path");

//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(baseConf, {
    mode: 'development',

    module: {
        rules: styleLoader.styleLoader({ extract: false, sourceMap: true })
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        publicPath: '/',
        // libraryTarget: 'commonjs2'
    },

    devtool: 'inline-source-map',

    //显示模块相对路径
    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),
        //显示模块相对路径
        new webpack.NamedModulesPlugin(),
        //配置html入口信息
        new HtmlWebpackPlugin({
            // chunks: ["app","css"],
            filename: 'index.html',
            template: '../../src/resource/template/index.html', //'../../../src/resource/template/index.html',
            inject: 'body',
            title: '测试',
            hash: false
        }),
    ]
});
