const path = require('path')
const fsNode = require('fs')
const MFS = require('memory-fs')
const webpack = require('webpack')
const middleware = require('webpack-koa2-middleware');
const clientConfig = require('../webpack.client.js');
const serverConfig = require('../webpack.server.js');

const readFile = (fs, file) => fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');

module.exports = function setupDevServer(app, cb) {
    let bundle, clientManifest;

    const template = fsNode.readFileSync(path.resolve(__dirname, '../../src/resource/template/index.html'), 'utf-8');

    const update = () => {

        if (bundle && template && clientManifest) {
            cb(bundle, {
                template,
                clientManifest
            })
        }
    };

    // client
    const clientCompiler = webpack(clientConfig);
    let devMiddleware = middleware(clientCompiler, {
        stats: {
            colors: true
        }
    });
    app.use(devMiddleware);

    clientCompiler.plugin('done',function (stats) {
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        if (stats.errors.length) return;

        const fs = devMiddleware.fileSystem;
        clientManifest = JSON.parse(readFile(
            fs,
            'vue-ssr-client-manifest.json'
        ));

        update();
    });

    const mfs = new MFS();
    const serverCompiler = webpack(serverConfig);
    serverCompiler.outputFileSystem = mfs;

    serverCompiler.watch({}, (err, stats)=>{
        if (err) {
            throw err
        }
        stats = stats.toJson();
        if (stats.errors.length) return;

        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
        update()
    })
};