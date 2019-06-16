const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const bundle = require('../../dist/vue-ssr-server-bundle.json');
const template = fs.readFileSync(resolve('../../dist/index.html'), 'utf-8');
const clientManifest = require('../../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template,
    clientManifest
});

server.get('*', (req, res) => {
    const context = { url: req.url };
    console.log(context);
    renderer.renderToString(context, (err, html) => {
        console.log(err);
        console.log(html);
        res.end(html)
    })
}).listen(8899);