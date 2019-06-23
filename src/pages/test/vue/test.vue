<template>
    <div @click="go">test-page-{{item}}</div>
</template>
<script>
    import { TEST_PAGE_SAVE } from '@Pub/store/pages/page-vuex-type.js'
    import route from '@Pub/router'

    export default {

        // 自定义获取数据的函数。
        asyncData ({ store, route, renderData }) {
            // 触发 action 后，会返回 Promise
            // return store.dispatch('fetchItem')
            console.log('test.vue');
            console.log(renderData);
            return store.dispatch(TEST_PAGE_SAVE, renderData.data)
        },
        computed: {
            // 从 store 的 state 对象中的获取 item。
            item () {
                return this.$store.state.test.page
            }
        },

        mounted(){
            console.log('mounted');
            // this.$store.dispatch('fetchItem')
        },

        methods: {
            go(){
                route.go('/page/home/index');
            }
        }
    }
</script>