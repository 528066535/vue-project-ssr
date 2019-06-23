const CONFIG = require('./CONFIG');
const proxy = require('koa-proxies');

module.exports = {
    init: function (app, ssr) {
        //index.html 不能有，不然可能会出问题
        app.use(async (ctx, next) => {
            if (ctx.path === '/') {
                await ssr.renderHtml(ctx, true).then(res=>{
                    let html = res;
                    ctx.response.type = 'text/html';
                    ctx.body  = html;
                });
            } else if(ctx.path.indexOf(CONFIG.SERVER_API)==-1 && ctx.path.indexOf(CONFIG.NODE_API)==-1) {
                console.log('============');
                console.log('node 编译首屏html...');
                console.log('============');
                await ssr.renderHtml(ctx, false).then(res=>{
                    let html = res;
                    ctx.response.type = 'text/html';
                    ctx.body  = html;
                });
            }
            else if(ctx.path.indexOf(CONFIG.SERVER_API)>-1) {
                return next();
            }
        });
    },

    proxy: function (app) {
        app.use(proxy(CONFIG.SERVER_API, {
            target: CONFIG.API_URL,
            xfwd: true,
            changeOrigin: false,
            rewrite: path => {
                console.log(path);
                return path.replace(CONFIG.SERVER_TAG, '');
            },
            logs: false
        }));
    }
};