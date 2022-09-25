<template>
    <Layout>
        <template>
            <div class="main-container" ref="mainContainer">
                <ArticleCont :blogData="data" v-if="data" />
                <Loading v-if="isLoaded" />
                <ArticleCom v-if="!isLoaded" />
            </div>
        </template>
        <template #right>
            <!-- <div class="right-container" v-if="!(data.toc.length == 0)"> -->
            <div class="right-container" v-if="data && data.toc.length">
                <!-- <ArticleCTL :ctl="data.toc" />
                <Loading v-if="isLoaded" /> -->
            </div>
        </template>
    </Layout>
</template>

<script>
// 这个组件是一条博客文章的详情，其中又由内容区+评论和目录区构成左右两栏

import Layout from '@/components/Layout'//布局组件
import Loading from '@/components/Loading'//加载中组件
import ArticleCont from '@/views/Blog/components/articleCont.vue'//文章内容区
import ArticleCTL from '@/views/Blog/components/articleCTL.vue'//文章目录区
import fetchData from '@/mixins/fetchData.js'//混合
import {getOnlyBlog} from '@/api/list.js'
import ArticleCom from './articleComm.vue'//评论区
export default {
    mixins : [fetchData(null)],
    components : {
        Layout,
        Loading,
        ArticleCont,
        ArticleCTL,
        ArticleCom
    },
    methods : {
        async fetchData(){
           const res = await getOnlyBlog(this.$route.params.id)
           
           console.log(res)
            return res
  
        },
        //这里是文章详情页监听滚动事件
        handleScroll(){
            //触发dom元素上的mainScroll事件
            this.$bus.$emit("mainScroll",this.$refs.mainContainer)
        },
        //回到顶部的事件处理函数
        handleSetMainScroll(scrollTop){
            this.$refs.mainContainer.scrollTop = scrollTop
        }
    },
    mounted(){
        // 给mainContainer绑定一个事件，名为handleScroll
        this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
        // 触发设置滚动回到顶部的事件
        this.$bus.$on("setMainScroll", this.handleSetMainScroll);
    },
    beforeDestroy(){
        //在销毁事件之前在触发一次不传dom的事件，dom是undefined
        this.$bus.$emit("mainScroll");
        //组件销毁后同时销毁事件
        this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
        //取消监听回到顶部的事件处理函数
        this.$bus.$off("setMainScroll", this.handleSetMainScroll);
    },
    updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
}
</script>

<style lang="less" scoped>
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>