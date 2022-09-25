import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import * as blogApi from '@/api/list.js'

import './mock/index.js'//最开始的时候运行一遍模拟数据，明确拦截规则

import router from './routes/routes.js'
import './eventBus'//
import showMessage from "./utils/showMessage";
Vue.prototype.$showMessage = showMessage;//给vue原型绑定方法
// showMessage('adfdsa','info',1000)

import * as blogData from './api/list'
blogData.getListClassify().then((resp)=>{
  // console.log(resp)
})
blogData.getListPage(3,5,-1).then((resp)=>{
  // console.log(resp)
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// 测试
// blogApi.getOnlyBlog("123").then((r) => {
//   console.log(r)
// })
// blogApi.postComment({
// 	nickname: "昵称",
// 	content: "评论内容，纯文本",
// 	blogId: '123'
// }).then((r) => {
//   console.log(r)
// })
// blogApi.getPageCom(-1,1,10).then((r) => {
//   console.log(r)
// })