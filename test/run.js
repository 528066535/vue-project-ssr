const server = require('express')();
const createApp = require('./app');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync(resolve('./index.html'), 'utf-8'),
    runInNewContext: false
});

server.get('*', (req, res) => {
    const context = { url: req.url };

    createApp(context).then(app=>{
        renderer.renderToString(app, (err, html) => {
            if (err) {
                res.status(500).end('Internal Server Error')
                return
            }
            res.end(html)
        })
    });
});

server.listen(5003);