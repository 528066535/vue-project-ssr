import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject)=>{
        const { app, router, store } = createApp('history');

        const { url } = context;
        const { fullPath } = router.resolve(url).route;

        if (fullPath !== url && fullPath !== '/404') {
            return reject({ url: fullPath })
        }

        // 设置服务器端 router 的位置
        // 疑问二
        router.push(url);

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map( ({asyncData}) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then( () => {
                context.state = store.state;
                resolve(app)
            }).catch(reject)
        })
    })
}