// router规则
import VueRouter from 'vue-router'
import Vue from 'vue'
 
//routerlink绑定的有path,把导航栏不同的path对应要展示的内容区导入
import Home from '@/views/Home/index.vue'
import Blog from '@/views/Blog/index.vue'
import About from '@/views/About/index.vue'
// import Project from '@/views/Project/index.vue'
import Message from '@/views/Message/index.vue'
import BlogDetails from '@/views/Blog/components/BlogDetails.vue'//博客文章详情

Vue.use(VueRouter)
const router = new VueRouter({
    routes:[//规定什么路径对应什么内容
    { name: "Home", path: "/", component: Home },
    { name: "About", path: "/about", component: About },
    { name: "Blog", path: "/article", component: Blog },
    { name: "CategoryBlog", path: "/article/cate/:categoryId", component: Blog },//分类博客
    //匹配到博客详情页
    { name : "BlogDetails", path:"/article/:id", component :BlogDetails },
    { name: "Message", path: "/message", component: Message },

  ],
  mode : 'history'
})
export default router