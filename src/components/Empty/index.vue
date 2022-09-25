<template>
    <div class="empty-container">
        <Icon type="empty" />
        <p>{{text}}</p>
    </div>
    
</template>

<script>
import Icon from '../Icon/index.vue'
export default {
    props:{
        text:{
            type:String,
            default:"无数据"
        }
    },
    components : {
        Icon
    }
}

</script>

<style scoped  lang="less">
@import '~@/styles/general.less';
@import '~@/styles/var.less';

.empty-container{
    .self-center();
    color:@gray;
    text-align: center;
}
.iconfont{
    font-size:40px;
}
</style>
