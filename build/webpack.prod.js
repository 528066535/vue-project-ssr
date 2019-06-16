const webpack = require('webpack');
const styleLoader = require('./style-loader');
const baseConf = require('./webpack.base.js');

//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require("webpack-merge");

//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(baseConf, {
    mode: 'production',

    module: {
        rules: styleLoader.styleLoader({ extract: true, sourceMap: true })
    },

    devtool: 'cheap-module-eval-source-map',

    //显示模块相对路径
    plugins: [
        //显示模块相对路径
        new webpack.NamedModulesPlugin(),
        //配置html入口信息
        new HtmlWebpackPlugin({
            chunks: [],
            filename: 'index.html',
            template: './src/resource/template/index.html',
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
    ]
});
