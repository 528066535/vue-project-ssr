const component = {
    index: () => import(/* webpackChunkName: "pages/home/vue/index" */'@Pages/home/vue/index'),
};

export default {
    component: {

    },

    router: [
        { path: '/page/home/index', name: '首页', component: component.index },
    ]
}