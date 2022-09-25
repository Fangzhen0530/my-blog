<template>
    <div class="layout-container">
        <div class="layout-left">
            <slot name="left"></slot>
        </div>
        <div class="layout-center">
            <slot></slot>
        </div>
        <div class="layout-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .layout-container{
        width:100%;
        height:100%;
        display: flex;
        .layout-left{
            flex:0 0 auto;
            overflow: hidden;
        }
        .layout-center{
            overflow: hidden;
            flex:1 1 auto;
        }
        .layout-right{
            overflow: hidden;
            flex:0 0 auto;
        }
    }
</style>