const koa = require('koa');
const ssr = require('./koa-ssr');
const CONFIG = require('./CONFIG');
const isProd = false;

const app = new koa();

ssr.init(app, isProd);

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