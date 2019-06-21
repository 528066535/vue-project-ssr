const koa = require('koa');
const ssr = require('./koa-ssr');
const CONFIG = require('./CONFIG');
const proxy = require('koa-proxies');
const isProd = false;

const app = new koa();

ssr.init(app, isProd);

//index.html 不能有，不然可能会出问题
app.use(async (ctx, next) => {
    console.log(ctx.path);
    console.log(CONFIG.SERVER_TAG);
    console.log(ctx.path.indexOf(CONFIG.SERVER_TAG));

    if (ctx.path === '/') {
        await ssr.renderHtml(ctx, true).then(res=>{
            let html = res;
            ctx.response.type = 'text/html';
            ctx.body  = html;
        });
    } else if(ctx.path.indexOf(CONFIG.SERVER_TAG)==-1) {
        await ssr.renderHtml(ctx, false).then(res=>{
            let html = res;
            ctx.response.type = 'text/html';
            ctx.body  = html;
        });
    }
    else if(ctx.path.indexOf(CONFIG.SERVER_TAG)>-1) {
        console.log('这个是接口的请求');
        return next();
    }
});


app.use(proxy(CONFIG.SERVER_TAG, {
    target: CONFIG.API_URL,
    xfwd: true,
    changeOrigin: false,
    rewrite: path => {
        console.log(path);
        return path.replace(CONFIG.SERVER_TAG, '');
    },
    logs: false
}));

app.listen(CONFIG.PORT);
console.log('====================');
console.log('listen at '+CONFIG.PORT);
console.log('====================\n');