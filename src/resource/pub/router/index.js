import VueRouter from 'vue-router'
import Data from '@Core/data'

Vue.use(VueRouter);

let router = null;

// 1. 定义 (路由) 组件。
export default {
    /**
     * 获取当前路由地址中的所携带的参数
     */
    get param(){
        let hash = location.hash.split('?')[1];
        let obj = {};
        if(hash){
            hash = hash.split('&');
            for(let i = 0; i < hash.length; i++){
                let param = hash[i].split('=');
                obj[param[0]] = decodeURIComponent(param[1]);
            }
        }
        return obj;
    },

    get url(){
        return location.hash.replace('#', '');
    },

    /**
     * 初始化路由
     */
    init(routers, mode='history'){
        router = new VueRouter({mode: 'history',routes: routers});

        router.beforeEach((to, from, next) => {
            if(to.meta.auto && !Data.getToken()) {
                next({path: '/login'});
            }
            if(to.name) {

            }
            next();
        });

        return router;
    },

    /**
     * 地址跳转
     */
    go(url, param, reload){
        Vue.nextTick(() => {
            if(router && (url !== router.history.current.path)){
                const name = router.history.current.name;
                param = param || {};
                let currentParam = this.param;
                if(currentParam.menu && !param.menu){
                    param.menu = currentParam.menu;
                }

                if(name && param.id){
                    param.fn = name;
                }

                url = url.split('?')[0];

                if(reload){
                    this.replace(param, url, true);
                    window.location.reload();
                }else{
                    router.push({path: url, query: param});
                }
            }else{
                window.location.reload();
            }
        });
    },

    replace(param, replaceUrl, isPush){
        let url = replaceUrl || this.url;
        let urlParam = util.getUrlParams(url);
        for(let key in param){
            urlParam[key] = param[key];
        }
        url = url.split('?')[0];
        let query = [];
        for(let key in urlParam){
            if(key){
                query.push(`${key}=${urlParam[key]}`);
            }
        }

        let queryParam = query.length > 0?'?' + query.join('&'):'';
        if(isPush){
            history.pushState(null, "", "#" + url + queryParam);
        }else{
            history.replaceState(null, "", "#" + url + queryParam);
        }

    }
}