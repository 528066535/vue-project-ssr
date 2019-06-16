const component = {
    test: () => import(/* webpackChunkName: "pages/test/vue/test" */'@Pages/test/vue/test'),
};

export default {
    component: {

    },

    router: [
        { path: 'test/test', name: '测试界面', component: component.test },
    ]
}