<template>
    <div class="test-container">
        <Layout>
            <template #left>
                <div class="left">left</div>
            </template>
            <template>
                <div class="main">center</div>
            </template>
            <template #right>
                <div class="right">right</div>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from './index.vue'
export default {
    components : {
        Layout
    }
}
</script>

<style lang="less" scoped>
    .test-container{
        width:500px;
        height:400px;
        border:1px solid red;
        margin:0 auto;
        .left{
            width:200px;
            height:100%;
            background:red;
        }
        .main{
            width:100%;
            height:100%;
        }
        .right{
            height:100%;
            width:100px;
            background:blue;
        }
    }
</style>