const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProd = process.env.NODE_ENV === 'production';
const vueConfig = require('./vue-loader.conf.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const fileName = isProd ? '[name].[chunkHash:8]':'[name]';

let output;

if(isProd) {
    output = {
        filename: `${fileName}.js`,
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: `${fileName}.js`,
        publicPath: '/',
    };
}
else {
    output = {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        publicPath: '/',
    };
}

module.exports = {
    entry: {
    },
    output: output,

    devtool: isProd ? 'cheap-module-eval-source-map' : 'inline-source-map',
    mode: isProd ? 'production':'development',
    plugins: [

        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath(`css/${fileName}.css`);
            },
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            Vue: 'vue'
        })
    ],
    resolve: {
        extensions: [ '.js', '.vue', 'less'], //后缀名自动补全
        alias: {
            '@': path.resolve(__dirname, "../src"),
            '@Pages': path.resolve(__dirname, "../src/pages"),
            '@Images': path.resolve(__dirname, "../src/resource/asset/images"),
            '@Core': path.resolve(__dirname, "../src/resource/core"),
            '@Pub': path.resolve(__dirname, "../src/resource/pub"),
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                options: vueConfig
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `${fileName}.[ext]`,
                            outputPath: 'font/' //字体可以设置存放位置
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    {
                        loader: 'url-loader',
                        // fallback: 'file-loader',
                        options: {
                            name: `${fileName}.[ext]`,
                            outputPath: 'images/',
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    {
                        loader: 'url-loader',
                        // fallback: 'file-loader',
                        options: {
                            name: `${fileName}.[ext]`,
                            outputPath: 'media/',
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader?cacheDirectory', // 缓存loader执行结果 发现打包速度已经明显提升了
                    options: {//如果有这个设置则不用再添加.babelrc文件进行配置
                        "babelrc": false,// 不采用.babelrc的配置
                        "plugins": [
                            "dynamic-import-webpack"
                        ]
                    }
                }],
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
            }
        ]
    },
};
