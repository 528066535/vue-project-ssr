import {createApp} from './app'

const {app, router, store} = createApp('hash');

// 疑问一
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        // 我们只关心之前没有渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        });

        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
        if (!asyncDataHooks.length) {
            return next()
        }

        // 这里如果有加载指示器(loading indicator)，就触发
        Promise.all(asyncDataHooks.map(hook => hook({store, route: to})))
                .then(() => {
                    // 停止加载指示器(loading indicator)
                    next()
                })
                .catch(next)
    });

    // 挂载到根节点上
    console.log('已挂载');
    app.$mount('#app', true)
});