const koa = require('koa');
const ssr = require('./koa-ssr');
const route = require('./route');
const CONFIG = require('./CONFIG');
const isProd = false;

const app = new koa();

ssr.init(app, isProd);

route.init(app, ssr);

route.proxy(app);

app.listen(CONFIG.PORT);
console.log('====================');
console.log('listen at '+CONFIG.PORT);
console.log('====================\n');