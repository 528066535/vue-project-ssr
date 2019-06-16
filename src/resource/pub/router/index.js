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
}