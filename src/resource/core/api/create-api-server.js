import axios from 'axios'

let axiosApi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 1000
});

export default {
    api: axiosApi,
    post(url, data) {
        return axiosApi({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(res => {
            return res && res.data
        })
    },
    async get(url, params) {
        return axiosApi({
            method: 'get',
            url,
            params
        }).then(res => {
            return res && res.data
        })
    }
}