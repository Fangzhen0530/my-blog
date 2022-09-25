<template>
    <div class="image-loader-container">
        <img class="holder" :src="placeholder" alt=""
        v-if="!holderShow"
        >
        <!-- 原图加载完成，originShow改为true，遮盖图消失。因为原图是在一个时间段慢慢展示出来的，所以这个图消失后会有一个时间段的空白 -->
        <img class="origin" 
        :src="src" alt="" 
        @load="handleLoad"
        :style="{opacity : originShow ? 1 : 0,
        transition: `${duration}ms`}"
        >
        <!-- 要展示的图片加载完成后，触发事件，用duration时间把原图透明度由0改为1 -->
    </div>
        
    
</template>


<script>
export default {
    data(){
        return {
            originShow : false,//该数据是false时，原图没有加载完成。是true时，原图加载完成
            holderShow : false,//用于控制遮盖图的消失
        }
    },
   props :{
        src:{
            type:String,
            required :true
        },
        placeholder:{
            type:String,
            required:true
        },
        duration :{
            type:Number,
            default:3000
        }
   },
   methods : {
    handleLoad(){
        setTimeout(() => {
            this.holderShow = true
        }, this.duration);
        this.originShow = true//load事件监听到原图加载完成后，把originShow改为true
        this.$emit('load')
     }
   }
}
</script>

<style lang="less" scoped>
    .image-loader-container{
        width:100%;
        height:100%;
        margin:0  auto;
        position: relative;
        img{
            object-fit: cover;
            position:absolute;
            width:100%;
            height:100%;
        }
        .origin{
            opacity: 0;
        }
    }
</style>
