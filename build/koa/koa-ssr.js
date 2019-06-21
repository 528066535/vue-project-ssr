const path = require('path');

const fs = require('fs');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

const resolve = file => path.resolve(__dirname, file);

const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, Object.assign({}, options, {
        runInNewContext: false,
    }))
};

const renderData = (ctx, renderer, empty) => {
    const context = {
        url: empty? '/index':ctx.url
    };

    return new Promise( (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                console.log('error message');
                console.log(err);
                context.serverError = true;
                resolve(html);
            }
            else {
                resolve(html);
            }
        })
    })
};

let renderer = null;
let isProd = null;

module.exports = {
    init: function(app, initProd){
        isProd = initProd;
        if (isProd) { // 生产环境直接获取
            const template = fs.readFileSync(resolve('../../dist/template/home.html'), 'utf-8');
            const bundle = require('../../dist/vue-ssr-server-bundle.json');
            const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
            renderer = createRenderer(bundle, {
                template,
                clientManifest
            })
        }
        else{ // 开发环境 要从内存中获取 serverBundle 和 clientManifest 和 template
            require('./setup-dev-server.js')(app, (bundle, options) => {
                renderer = createRenderer(bundle, options);
            })
        }

    },

    renderHtml:async function (ctx, empty) {
        const s = Date.now();

        // 提示webpack还在工作
        if (!renderer) {
            ctx.type = 'html';
            return 'waiting for compilation... refresh in a moment.';
        }

        let html,status;
        try {
            html = await renderData(ctx, renderer, empty);
        }catch(e) {
            if (e.code === 404) {
                status = 404;
                html = '404 | Not Found'
            }else{
                status = 500;
                html = '500 | Internal Server Error';
                console.error(`error during render : ${ctx.url}`)
            }
        }

        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }

        return html;
    }
};
