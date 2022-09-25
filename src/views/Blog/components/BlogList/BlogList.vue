<template>
    <div class="blog-list-container" ref="mainContainer">
        <ul>
            <li v-for="item in data.rows" :key="item.id">
                <div class="thumb" v-if="item.thumb">
                  <!-- 点击图片进入详情页 -->
                    <RouterLink :to="{name :'BlogDetails',
                      params : {id : item.id}
                    }">
                        <img :src="item.thumb1" :alt="item.title" :title="item.title" />
                    </RouterLink>
                </div>
                <div class="main">
                  <!-- 点击标题进入详情页 -->
                    <RouterLink :to="{name :'BlogDetails',
                      params : {id : item.id}
                    }">
                        <h2>{{ item.title }}</h2>
                    </RouterLink>
                <div class="aside">
                    <span>日期：{{ time(item.createDate) }}</span>
                    <span>浏览：{{ item.scanNumber }}</span>
                    <span>评论：{{ item.commentNumber }}</span>
                    <RouterLink :to="{name :'CategoryBlog',
                      params : {categoryId: routeInfo.categoryId}
                    }">
                    {{item.category.name}}
                    </RouterLink>
                </div>
                <div class="desc">
                    {{ item.description }}
                </div>
                </div>
            </li>
        </ul>
        <div class="loading" v-if="isLoaded">
          <Loading />
        </div>
        <Pager :current="routeInfo.page" 
        :total="data.total"
        :limit="routeInfo.limit"
        @pageChange="handlePageChange"
        v-if="data.total"
         />
    </div>
</template>

<script>
// 这是文章中间区域
import fetchData from '@/mixins/fetchData.js'
import {getListPage} from '@/api/list.js'
import {time} from '@/utils/index.js'//把时间戳变为有格式的时间
import Loading from '@/components/Loading'//加载中组件
import Pager from '@/components/Pager'
import {server_URL} from '@/utils/getUrl.js'
export default {
    mixins : [fetchData({})],
    components : {
      Loading,
      Pager
    },
    computed : {
      //获取路由信息，就是对地址栏里的参数变化相应
      routeInfo(){
        //文章模块地址栏一种是以article结尾的是没有分类的，一种是以/cate/1是有分类的。有分类的才有categoryId，没有分类的就默认为-1（显示所有）
        // 添个”+“是因为获取到的是字符串，要转为number
        const categoryId = +this.$route.params.categoryId || -1//只有有分类的才有params
        //展示第几页，默认是1
        const page = +this.$route.query.page || 1
        //每一页有多少条数据，默认是10条
        const limit = +this.$route.query.limit || 10
        //返回一个对象，供使用这些数据
        return {
          categoryId,
          page,
          limit,
        }
      },
    },
    mounted() {
          // 这里是博客文章列表绑定滚动事件
      this.$bus.$on("setMainScroll",this.handleSetMainScroll);
      this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      this.$bus.$emit("mainScroll");
      this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
      this.$bus.$off("setMainScroll", this.handleSetMainScroll);
    },
    methods :{
      time,//直接把组件放在这里，就成一个方法了，就可以直接当方法用
      async fetchData(){
            const res = await getListPage(
              this.routeInfo.page,
              this.routeInfo.limit,
              this.routeInfo.categoryId
            )
            for (const item of res.rows) {
              item.thumb1 = server_URL + item.thumb
            }
            // console.log(res)
            return res
      },
      handlePageChange(page){//点击事件：上下一页，某一页 ，第一页，最后一页 
          const query={
            page: page,//新页码
            limit: this.routeInfo.limit,//页容量
          }
          console.log(this.routeInfo.categoryId)
          if(this.routeInfo.categoryId === -1){
          //无分类的地址
            this.$router.push({
              name:"Blog",
              query
            })
          }else{
            // 有分类的地址
            this.$router.push({
              name:"CatagoryBlog",
              query,
              params:{
                caregoryId : this.routeInfo.categoryId
              }
            })
          }
      },
      handleScroll() {
          this.$bus.$emit("mainScroll", this.$refs.mainContainer);
      },
      handleSetMainScroll() {
          this.$refs.mainContainer.scrollTop = 0;
      },
    },
    watch: {
        async $route() {
          this.isLoaded = true;
          // 滚动高度为0
          this.$refs.mainContainer.scrollTop = 0;
          this.data = await this.fetchData();
          this.isLoaded = false;
        },
    },
  }
</script>

<style lang="less" scoped>
    @import "~@/styles/var.less";
    @import "~@/styles/general.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
.loading{
      .self-center()
    }
</style>