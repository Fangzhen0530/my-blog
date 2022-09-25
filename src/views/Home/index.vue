<template>
  <!-- @wheel是监控鼠标滚动事件 -->
  <!-- @transitionend是监控css过渡是否完成 -->
  <div class="home-container" ref="container" @wheel="handleWheel">
    <ul class="img-container" :style="{marginTop:marginTop}" @transitionend="handleTransitionEnd">
      <li v-for="item in data" :key="item.id">
        <Slideshow :item="item"/>
      </li>
    </ul>
    <div class="prev-page icon" v-show="index >= 1"
      @click="changePage(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div class="next-page icon" v-show="index < data.length - 1"
    @click="changePage(index + 1)">
      <Icon type="arrowDown" />
    </div>
    <ul class="point">
      <li v-for="(item, i) in data" :key="item.id"
      :class="{active: index == i}"
      @click="changePage(i)"></li>
    </ul>
    <div class="loading" v-if="isLoaded">
      <Loading />
    </div>
  </div>
  
</template>

<script>
// 该文件只负责首页的上下按钮、圆点、整体布局工作
import { getData} from '@/api//banner.js'
import Slideshow from './slideshow.vue'
import Icon from "@/components/Icon"
import Loading from '@/components/Loading'
import fetchData from '@/mixins/fetchData.js'
import { server_URL } from "@/utils/getUrl"
export default {
  mixins : [fetchData([])],
  components : {
    Slideshow,
    Icon,
    Loading
  },
  data(){
    return {
      // banner : [],已混入，被data代替
      index:0,//控制是第几页
      top:0,
      changing:false,//是否正在切换，正在切换时，滚动鼠标也不会继续滚动了
      // isLoaded:true//是否正在加载，数据请求回来，就可以切换加载完成了：已混入
    }
    //远程数据获取可能应用于项目的很多地方，所以可以把这个东西抽离出来
  },
  //混入了，可以去掉：
  // async created(){//请求数据
  //   this.banner = await getData()
  //   this.isLoaded = false//加载完成，不用再loading等待
  // },
  mounted(){//这个是在生成真实dom后运行的，只运行一次，当浏览器的视口变化时，这个函数不会再运行，也就导致了容器的高度一直是刚开始的高度，不会随浏览器变化而变
    this.top = this.$refs.container.clientHeight//获取容器的高度
    window.addEventListener('resize',this.handleResize)//resize事件是视口尺寸变化就会运行得事件
    //给window注册事件，这样给组件注册全局的事件一定要移除事件，
    // 移除的事件得是具名事件，所以这个事件函数要抽离出来
  },
  destroyed(){//当这个组件被销毁时运行得函数
  //这个事件只在这个组件运行时窗口变化时用，所以再这个组件被销毁时要移除事件
    window.removeEventListener('resize',this.handleResize)
  },
  computed :{
    marginTop(){//计算ul marginTop的值，滚动到相应页面
      return -this.index * this.top +'px'
    }
  },
  methods : {
    async fetchData(){//这是混入进来的方法，用于请求远程数据
      //调用导入的请求数据方法，请求到的数据作为这个函数的返回值
      const resp = await getData()
      for (const item of resp) {
        item.bigImg1 = server_URL + item.bigImg
        item.midImg1 = server_URL + item.midImg
      }
      return resp
    },
    changePage(i){
      this.index = i
    },
    handleWheel(e){//监听鼠标滚轮滚动切换界面
      if(this.changing){
        return
      }
      if(e.deltaY === 125 & this.index < this.data.length - 1){//向下滚动
        this.index ++
        this.changing = true
      }
      if(e.deltaY === -125 & this.index > 0){
        this.index --
        this.changing = true
      }
    },
    handleTransitionEnd(){//监听css完成过渡后的事件，一个一个切，
      this.changing = false
    },
    handleResize(){//视口变化要做得事就是重新获取视图尺寸
      this.top = this.$refs.container.clientHeight
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/general.less';
@import '~@/styles/var.less';

  .home-container{
    width:100%;
    height:100%;
    position:relative;
    //解决bfc：子父级是定位元素，子级随着父级一块动
    overflow:hidden;
    .img-container{
      width:100%;
      height:100%;
      transition: 500ms;
      li{
        width:100%;
        height:100%;
      }
    }
    .icon{
      .self-center();
      font-size: 30px;
      color:@gray;
      cursor:pointer;
      transform: translateX(-50%);
      &.prev-page{
        top:25px;
        animation:jump-up 2s infinite;
    }
      &.next-page{
        top:auto;
        bottom:25px;
        animation:jump-down 2s infinite;
      }
      @keyframes jump-up {
        0%{
          transform: translateY(-50%, 5px)
        }
        50%{
          transform: translateY(-50%, -5px)
        }
        100%{
          transform: translateY(-50%, 5px)
        }
      }
      @keyframes jump-down {
        0%{
          transform: translateY(-50%, -5px)
        }
        50%{
          transform: translateY(-50%, 5px)
        }
        100%{
          transform: translateY(-50%, -5px)
        }
      }
    }
    .point{
      .self-center();
      right:20px;
      left:auto;
      transform: translateY(-50%);
     
      .active{
        background: #fff;
      }
      li{
        width:8px;
        height:8px;
        background:@words;
        border-radius:50%;
        margin:4px 0;
        cursor: pointer; 
        box-sizing: border-box;
        border: 1px solid #fff;
      }
    }
    .loading{
      .self-center()
    }
  }
</style>