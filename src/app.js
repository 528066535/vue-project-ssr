import Core from '@Core'
import { createStore } from '@Pub/store'
import Router from '@Pub/router'
import routers from '@Pub/router/local-menu'
import routerMenu from '@Pub/router/router-menu'
import main from './App.vue'
import '@/resource/css'

for(let i in routers) {
    if(routers[i].path == '/page') {
        routers[i].children = routerMenu.routers;
    }
}

routers.concat(routerMenu.routers);

export function createApp (mode) {
    let router = Router.init(routers,mode);
    let store = createStore();
    let app = new Vue({
        Core,
        router,
        store,
        render: h => h(main)
    });
    return { app, router, store }
}