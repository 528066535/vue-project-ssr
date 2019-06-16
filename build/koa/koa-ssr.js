const router = require('koa-router')();

const path = require('path');

const fs = require('fs');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

const resolve = file => path.resolve(__dirname, file);

const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, Object.assign({}, options, {
        runInNewContext: false,
    }))
};

const renderData = (ctx, renderer) => {
    const context = {
        url: ctx.url
    };

    return new Promise( (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return reject(err)
            }
            resolve(html)
        })
    })
};

module.exports = function(app, isProd){
    let renderer = null;

    if (isProd) { // 生产环境直接获取
        const template = fs.readFileSync(resolve('../../dist/index.html'), 'utf-8');
        const bundle = require('../../dist/vue-ssr-server-bundle.json');
        const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
        renderer = createRenderer(bundle, {
            template,
            clientManifest
        })
    }
    else{ // 开发环境 要从内存中获取 serverBundle 和 clientManifest 和 template
        const template = fs.readFileSync(resolve('../../src/resource/template/index.html'), 'utf-8');
        require('./setup-dev-server.js')(app, (bundle, options) => {
            console.log('bundle callback..');
            options.template = template;
            renderer = createRenderer(bundle, options);
        })
    }

    router.get('*', async (ctx, next) => {
        // 提示webpack还在工作
        if (!renderer) {
            ctx.type = 'html';
            return ctx.body = 'waiting for compilation... refresh in a moment.';
        }
        const s = Date.now();
        let html,status;
        try {
            html = await renderData(ctx, renderer)
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
        ctx.type = 'html';
        ctx.status = status ? status : ctx.status;
        ctx.body = html;
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    });

    app.use(router.routes()).use(router.allowedMethods());
};

