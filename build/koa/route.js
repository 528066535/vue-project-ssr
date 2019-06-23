const CONFIG = require('./CONFIG');
const proxy = require('koa-proxies');
const api = require('./api');

module.exports = {
    init: function (app, ssr) {
        //index.html 不能有，不然会直接返回index.html
        app.use(async (ctx, next) => {
            // 首页
            if(ctx.path.indexOf(CONFIG.SERVER_API)>-1) {
                return next();
            }
            // 渲染界面
            else {
                await api(ctx);
                await ssr.renderHtml(ctx, false).then(res=>{
                    let html = res;
                    ctx.response.type = 'text/html';
                    ctx.body  = html;
                });
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
                return path.replace(CONFIG.SERVER_API, '');
            },
            logs: false
        }),);
    }
};