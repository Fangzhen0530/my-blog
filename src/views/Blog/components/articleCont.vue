<template>
  <div class="article-cont-container">
    <h1>{{ blogData.title }}</h1>
    <div class="aside">
      <span>日期: {{ time(blogData.createDate) }}</span>
      <span>浏览: {{ blogData.scanNumber }}</span>
      <!-- 给a标签加一个锚链接，点击就可以直接跳转到评论内容区 -->
      <a href="#comment">评论: {{ blogData.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blogData.category ? blogData.category.id : -1,
          },
        }"
      >
        {{ blogData.category? blogData.category.name : '未分类' }}
      </RouterLink>
    </div>
    <div v-html="blogData.htmlContent"></div>
  </div>
</template>

<script>
// 这是具体某一文章的详情页的内容区
import { time } from '@/utils'//把时间戳改为有格式的时间方法
export default {
  props : {
    blogData: {
      type: Object,
      required : true
    }
  },
  methods :{
    time,
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
</style>