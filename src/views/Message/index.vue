<template>
  <div class="comment-message" ref="commentMsg" >
    <CommentMsg 
    title="留言板" 
    :subTitle="`(${data.total})`" 
    :list="data.rows"
    :isListLoading="isLoaded" 
    @submit="handleSubmit" />
    <Loading v-if="isLoaded" />
  </div>
</template>

<script>
import CommentMsg from '@/components/CommentMsg/index.vue'
import fetchData from '@/mixins/fetchData.js'
import {getComment ,postComment} from '@/api/comment.js'
import Loading from '@/components/Loading'
import { server_URL } from '@/utils/getUrl.js'
export default {
  mixins : [fetchData({total:0,rows:[]})],
  data(){
    return {
      page : 1,
      limit : 10
    }
  },
  components : {
    CommentMsg,
    Loading
  },
  mounted(){

    this.$refs.commentMsg.addEventListener("scroll",this.emitScroll)
    this.$bus.$on("mainScroll",this.handleScroll)
    this.$bus.$on("setMainScroll",this.handleSetScroll)
  },
  beforeDestroy(){
    this.$bus.$emit("mainScroll")
    this.$refs.commentMsg.removeEventListener("scroll",this.emitScroll)
    this.$bus.$off("mainScroll",this.handleScroll)
    this.$bus.$off("setMainScroll",this.handleSetScroll)
  },
  methods : {
    async fetchData(){//获取一页留言
      const res = await getComment(this.page, this.limit)
      for (const item of res.rows) {
        item.avatar1 = server_URL + item.avatar
      }
      return res
    },
    async handleSubmit(formData,callback){
      const resp = await postComment(formData)
      callback("留言成功")
      this.data.rows.unshift(resp)
    },
    emitScroll(){
      this.$bus.$emit("mainScroll",this.$refs.commentMsg)
    },
    handleScroll(){//滚动，到底部会加载更多数据
      //1.是否正在加载
      if(this.isLoaded){
        return
      }
      
      // 2.没有正在加载，允许加载更多留言。设置一个范围，滚动的距离到这个范围就加载更多留言
      const range = 100
        //dom.scrollTop:滚动条相对于顶部的偏移
        //dom.scrollHeight : 是视口的顶部到滚动的底部的距离
        // dom.clientHeight： 是容器视口高度
        // scrollTop + clientHeight = scrollHeight
      const dec = this.$refs.commentMsg.scrollHeight - (this.$refs.commentMsg.scrollTop + this.$refs.commentMsg.clientHeight)
      if(dec <= range){//可以加载更多留言了
          // 抽离方法：
          
          this.getNext()
      }
    },
    async getNext(){//加载下一页
      // 1.首先判断还有没有更多的留言
      if(this.data.rows.length >= this.data.total){
        // rows是放请求回来的留言数据的数组
        return
      }
      //有：发送请求，获取下一页的留言
      this.isLoaded = true //开始加载
      this.page++//页数加一，
      const nextMsg = await this.fetchData()
      // 把请求回来的数据掺入到留言数组后面
      this.data.rows = this.data.rows.concat(nextMsg.rows)
      this.isLoaded = false//加载完成
    },
    handleSetScroll(){
      this.$refs.commentMsg.scrollTop = 0
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/general.less';
.loading-container{
    .self-center(fixed);
 }
  .comment-message {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  position: relative;
}
.comment-msg-container{
  width: 700px;
  margin: 0 auto;
}
</style>