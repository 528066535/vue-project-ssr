<template>
    <div class="main-warp">
        <div class="main-header" style="background: #f5f5f5">顶部栏</div>
        <div class="main-body">
            <div class="main-menu" style="background: #f9f9f9">菜单栏</div>
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {

        },
        created() {

        },
        methods: {

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
    .main-warp {
        display: flex;
        flex-direction: column;
        height: 100%;

        .main-header {
            height: 60px;
        }

        .main-body {
            display: flex;
            flex: 1;
            height: 100%;
            overflow: hidden;

            .main-menu {
                width: 240px;
                height: 100%;
                flex-direction: column;
            }

            .main-content {
                display: flex;
                overflow: hidden;
                width: 0;
                flex: 1;
            }
        }
    }
</style>