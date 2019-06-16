import main from '@/resource/template/main'

console.log('local-menu');

let menu = [];
menu = menu.concat([
    {
        path: '/home',
        meta: { auth: false },
        component:  main,

        children: [
        ]
    },
    {
        path: '/*',
        name: '404',
        meta: { auth: false },
        component:  () => import(/* webpackChunkName: "pages/error/vue/error" */'@Pages/error/vue/error'),

        children: [
        ]
    }
]);
export default menu;