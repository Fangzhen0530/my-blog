import Vue from 'vue'
const app = new Vue({})//这样就能让每一个vue事例都有$but方法


// 注册在原型上，所有的组件都可以用
Vue.prototype.$bus = app

// 导出，js文件也可以导入使用
export default app//

/*
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * - 滚动的dom元素，如果是undefined，则表示dom元素已经不存在
 *
 * 事件名：setMainScroll
 * 含义：当需要设置主区域滚动条位置时触发
 * 参数：
 * - 滚动高度
 */