<template>
    <img :src="url" class="img-style"
        :style="{width:size+'px',height:size+'px'}"
    />
</template>

<script>

export default {
    props:{//props可以是数组和对象
        url:{//可以对组件使用时传过来的数据约束
            type:String,//要求传递的连接必须是字符串
            required:true,//要求必须传地址
        },
        size:{
            type:Number,
            default:150,//默认值
        },
    },
}
</script>
<style scoped>
/* scoped避免不同组件之间的类名冲突 */
    .img-style{
        border-radius: 50%;
        object-fit: cover;
        display:block;
    }
</style>