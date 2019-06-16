import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject)=>{
        const { app, router, store } = createApp('history');

        const { url, serverError } = context;
        const { fullPath } = router.resolve(url).route;

        if (fullPath !== url && fullPath !== '/404') {
            return reject({ url: fullPath })
        }

        // 设置服务器端 router 的位置
        router.push(url);

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                console.log('为空')
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map( ({asyncData}) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then( () => {
                context.state = store.state;
                console.log('------------');
                console.log(context);
                resolve(app)
            }).catch(()=>{
                reject
            })
        })
    })
}