<template>
  <div class="slideshow-container">
    <ImageLoader :src="item.bigImg1" :placeholder="item.midImg1" />
    <div class="text">
      <h2 class="title">{{item.title}}</h2>
      <div class="description">{{item.description}}</div>
    </div>
    
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader'
export default {
  props :['item'],
  components : {
    ImageLoader
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import '~@/styles/general.less';
  .slideshow-container{
    width: 100%;
    height:100%;
    background:@dark;
    color:#fff;
    position:relative;
    .text{
        .self-center();
        left:50px;
        transform: translate(0);
        top:50px;
      .title{
        text-align: center;
      }
    .description{
        text-indent: 2em;
        width:300px;
      }
    }
    
  }
</style>