// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '*',
                meta: { auth: false },
                component:  '<div>访问的 URL 是： {{ url }}</div>',
            },
            {
                path: '/home',
                meta: { auth: false },
                component:  '<div>首页</div>',
            },
            {
                path: '/item/:id',
                component: () => import('./item.vue')
            }
        ]
    })
}