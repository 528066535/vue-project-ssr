const koa = require('koa');
const ssr = require('./koa-ssr');
const CONFIG = require('./CONFIG');
const isProd = false;

const app = new koa();

ssr(app, isProd);

app.listen(CONFIG.PORT);
console.log('====================');
console.log('listen at '+CONFIG.PORT);
console.log('====================\n');