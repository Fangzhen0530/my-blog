<template>
    <div class="container">
        <Empty />
    </div>
</template>
<script>
import Empty from './index.vue'

export default {
    components :{
        Empty
    }
}
</script>
<style scoped lang="less">
.container{
    width:500px;
    height:500px;
    border:1px solid red;
    position:relative;
}
</style>