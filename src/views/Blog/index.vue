<template>
  <Layout>
    <template #left>
    </template>
    <template>
      <BlogList />
    </template>
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'//三栏分布布局组件
import BlogList from './components/BlogList/BlogList.vue'//博客文章组件
import BlogCategory from './components/BlogCategory/BlogCategory.vue'//博客文章右遍列表组件

export default {
  components : {
    Layout,
    BlogList,
    BlogCategory,
  },
}
</script>

<style>

</style>