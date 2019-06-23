<template>
    <div>test-page-{{item}}</div>
</template>
<script>
    import { TEST_PAGE_SAVE } from '@Pub/store/pages/page-vuex-type.js'
    import axios from 'axios'

    export default {

        // 自定义获取数据的函数。
        asyncData ({ store, route }) {
            // 触发 action 后，会返回 Promise
            // return store.dispatch('fetchItem')
            return store.dispatch(TEST_PAGE_SAVE, route.query.page)
        },
        computed: {
            // 从 store 的 state 对象中的获取 item。
            item () {
                console.log(this.$store.state);
                return this.$store.state.test.page
            }
        },

        mounted(){
            console.log('mounted');
            // this.$store.dispatch('fetchItem')
        }
    }
</script>