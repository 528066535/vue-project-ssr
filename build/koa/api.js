const axios = require('axios');
const CONFIG = require('./CONFIG');

function api(ctx) {
    return axios.get(`${CONFIG.API_URL}/data.json`)
            .then(function (response) {
                ctx.renderData = {
                    path: ctx.path,
                    data: response.data
                };
                console.log('首屏请求的数据');
                console.log(ctx.renderData);
            })
            .catch(function (error) {
                console.log(error)
            });
}
module.exports = api;