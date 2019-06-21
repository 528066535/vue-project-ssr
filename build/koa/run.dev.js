const koa = require('koa');
const ssr = require('./koa-ssr');
const CONFIG = require('./CONFIG');
const proxy = require('koa-proxies');
const isProd = false;

const app = new koa();

ssr.init(app, isProd);

app.use(proxy('/api', {
    target: CONFIG.API_URL,
    xfwd: true,
    changeOrigin: false,
    rewrite: path => {
        console.log('====================');
        console.log('请求');
        console.log(path);
        return path.replace('/api/', '/');
    },
    logs: false
}));

//index.html 不能有，不然可能会出问题
app.use(async ctx => {
    if (ctx.path === '/') {
        await ssr.renderHtml(ctx, true).then(res=>{
            let html = res;
            ctx.response.type = 'text/html';
            ctx.body  = html;
        });
    } else {
        await ssr.renderHtml(ctx, false).then(res=>{
            let html = res;
            ctx.response.type = 'text/html';
            ctx.body  = html;
        });
    }
});

app.listen(CONFIG.PORT);
console.log('====================');
console.log('listen at '+CONFIG.PORT);
console.log('====================\n');