<template>
    <div class="article-comment-container" id="comment" >
        <CommentMsg 
        title="评论信息"
        :subTitle="`(${data.total})`"
        :list="data.rows"
        :isListLoading="isLoaded"
        @submit="handleSubmit"
         />
         <Loading v-if="isLoaded" />
    </div>
</template>

<script>
// 这是具体某一文章的详情页下面的评论区,因为评论区和留言板都会用到这个组件，所以写道components里作为通用组件
import CommentMsg from '@/components/CommentMsg/index.vue'
import fetchData from '@/mixins/fetchData.js'
import {getPageCom ,postComment} from '@/api/list.js'//分页获取评论
import Loading from '@/components/Loading'
import {server_URL} from '@/utils/getUrl.js'
export default {
    mixins : [fetchData({total:0,row:[]})],
    components : {
        CommentMsg,
        Loading
    },
    data(){
        return {
            page : 1,
            limit : 10
        }
    },
    created(){
        //注册监听滚动事件，如果滚动到底部就加载更多评论信息
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    beforeDestroyed() {
        this.$bus.$emit("mainScroll")
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    computed:{
        hasNext(){//是否还有下一页数据
        // rows就是分页请求回来的数据容器，如果这个容器里面的数据量大于total（总数据量）了，那就是没有更多数据了
            return this.data.rows.length < this.data.total
        }
    },
    methods : {
        // 加载下一页评论数据
        async fetchNext(){
            if(!this.hasNext){
                //没有下一页数据了
                return
            }
            this.isLoaded = true//设置正在加载中
            this.page ++//改变页码参数为下一页
            const resp = await this.fetchData();//按新页码从新请求数据
            this.data.total = resp.total;
            // 把请求回来的新一页的数据拼在原来那一页数据后面，也就是在数据容器（rows）后面又加了一页数据，rows原来有10条，现在有20条：
            this.data.rows = this.data.rows.concat(resp.rows);
            // 加载完成
            this.isLoaded = false;
            
        },
        handleScroll(dom){//监听事件的处理函数,
            if(this.isLoaded || !dom){//正在加载，等上一次加载完再开始下一次
                return
            }
            const range = 100//在0-range范围内就是滚到了底部
            //dec的值就是，整个文章详情页容器顶部滚动的距离+视口的高度-整个容器的高度
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
            if(dec <=  range){
                this.fetchNext()
            }
        },
        async fetchData(){
           const res = await getPageCom(this.$route.params.id, this.page, this.limit)//把评论信息按照分页请求回来，然后渲染到页面
           for (const item of res.rows) {
                item.avatar1 = server_URL + item.avatar
           }
           return res
        },
        async handleSubmit(formData,callback){
            // 点击事件触发后，要把评论的信息发送给后端，后端会给返回一个数据。需要把这个数据放在评论区的最上面。也就是要在data数组的第一位加上请求回来的数据
            const resp = await postComment({
                blogId : this.$route.params.id,
                ...formData
            })
            this.data.rows.unshift(resp)//把响应的结果添加到数据第一位并渲染出来
            this.data.total++//数据总数改变
            // 然后还有提交按钮的状态要改回去，表单内的数据清空
            callback("评论成功")//告诉子组件，父组件事件处理完成.传递的参数子组件可以用来作为提示信息
        }
    }
}
</script>
<style lang="less" scoped>
@import '~@/styles/general.less';
.loading-container{
    .self-center(fixed);
 }
</style>