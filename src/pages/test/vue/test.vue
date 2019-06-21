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
            axios({url:'/node-api/api/data.json',method: 'get'})
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        this.$store.dispatch(type.TEST_PAGE_SAVE,response.status);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
        }
    }
</script>