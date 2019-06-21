<template>
    <div>home</div>
</template>
<script>
    export default {
        // 自定义获取数据的函数。
        asyncData ({ store, route }) {
            // 触发 action 后，会返回 Promise
            // console.log(store);
            return {item : '1'}
        },
        computed: {
            // 从 store 的 state 对象中的获取 item。
            item () {
                return this.$store.state.items[this.$route.params.id]
            }
        }
    }
</script>