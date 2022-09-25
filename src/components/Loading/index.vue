<template>
  <div class="loading-container">
    <img :src="imgSrc" alt="">
  </div>
</template>

<script>
//当引入得是本地静态资源时，可以直接把路径写上，webpack会帮忙打包。
// 当如果是动态得线上资源时，就要import引入路径，形成依赖，打包时，就会分析依赖，找到对应得资源
import imgSrc from '@/assets/loading.svg'
export default {
  data(){
    return {
      imgSrc
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/general.less';
 .loading-container{
    .self-center();
 }
</style>