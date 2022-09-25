<template>
  <div class="blog-category-container">
    <h2>文章分类</h2>
      <RightList :list="list" @select="handleSelect" />
      <Loading v-if="isLoaded" />
  </div>
</template>

<script>
// 这是文章右遍分类目录区域

import RightList from '../RightList/RightList.vue'
import fetchData from '@/mixins/fetchData.js'
import {getListClassify,getListPage} from '@/api/list.js'
import Loading from '@/components/Loading'
export default {
  mixins : [fetchData([])],
  components : {
    RightList,
    Loading
  },
  methods :{
    async fetchData(){
      const res1 = await getListClassify()
      // const res2 = await getListPage(1,5,res1.id)
      // console.log(res1)
      return res1
    },
    // async fetchId(){
    //   const res2 = await getListPage()
    // },
    async handleSelect(item) {
      // console.log(item.id)
      const query = {
        page: 1,
        limit: this.limit,

      };
      const res2 = await getListPage(1,item.articleCount,item.id)
      // console.log(res2.rows)
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
  computed:{
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  }
}
</script>

<style lang="less" scoped>
  .blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>