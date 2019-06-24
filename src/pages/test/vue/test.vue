<template>
    <div @click="go">test-page-{{item}}</div>
</template>
<script>
    import { TEST_PAGE_SAVE } from '@Pub/store/pages/page-vuex-type.js'
    import route from '@Pub/router'
    import axios from 'axios'

    export default {

        // 自定义获取数据的函数。
        asyncData ({ store, route }) {
            // 触发 action 后，会返回 Promise
            // return store.dispatch('fetchItem')
            console.log('test.vue');
            console.log(renderData);
            return store.dispatch(TEST_PAGE_SAVE, store.renderData.data)
        },
        computed: {
            // 从 store 的 state 对象中的获取 item。
            item () {
                return this.$store.state.test.page
            }
        },

        mounted(){
            axios.get(`/node-api/data.json`)
                    .then(function (response) {
                        console.log('==========');
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
        },

        methods: {
            go(){
                route.go('/page/home/index');
            }
        }
    }
</script>