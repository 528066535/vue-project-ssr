const koa = require('koa');
const path = require('path');
const ssr = require('./koa-ssr');
const koaStatic = require('koa-static');

const CONFIG = require('./CONFIG');
const isProd = true;

const app = new koa();

// 静态目录过期时间
let originalServe = koaStatic(path.join(__dirname, '../../dist'), {
    maxage: 30 * 24 * 60 * 60 * 1000
});
let modifiedServe = function(ctx, next) {
    ctx.path = ctx.path.replace('/dist', '/');
    return originalServe(ctx, next);
};
app.use(modifiedServe);

ssr(app, isProd);

app.listen(CONFIG.DISPORT);
console.log('====================');
console.log('listen at '+CONFIG.DISPORT);
console.log('====================\n');