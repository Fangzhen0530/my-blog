<template>
  <div class="article-ctl-container">
    <h2>目录{{ctl}}</h2>
    <RightList :list="addSelect" @select="handleSelect" />
  </div>
</template>

<script>
//// 这是具体某一文章的详情页的目录区
import RightList from './RightList/RightList.vue'
import { debounce } from "@/utils";//防抖函数
export default {
  props : {
    ctl:{
      type:Array,
    }
  },
  data(){
    return {
      activeAnchor :''//控制选中效果
    }
  },
  components : {
    RightList
  },
  methods : {
    handleSelect(item){
      location.hash = item.anchor
    },
    setSelect(scrollDom){//通过元素的位置，决定为目录哪个标题设置选中状态
      if(!scrollDom){
        return
      }
      this.activeAnchor = ""; // 由于后续要重新设置，先清空之前的选中状态
      const range = 200//文章内容里的标题元素离顶端的top距离，小于这个值就说明滚动到了这个标题，该标题对应的目录设置选中。
      for (const dom of this.doms) {
        //对元素数组循环,这个dom数据其实就是每个标题的html元素
        if(!dom){
          // 如果没有这个dom数据就结束本轮循环
          continue
        }
        //通过一个id名获取这个元素到视口顶部的距离
        const top = dom.getBoundingClientRect().top
        if(top >= 0 && top <= range){
          //如果这个元素的位置到视口顶部的距离在0-range范围内，对应的目录就是被选中的状态
          this.activeAnchor = dom.id//设置选中
          return
        }else if(top > range){//标题的位置距离顶部大于range了。这种情况是从上往下滚动，某个标题从下往上滚出来，但是还没有进入到要设置状态的范围，这个时候被设置状态的是上面一个标题。所以这时候什么都不做
        return
        }else{
          //这种是某个标题从下往上滚动，当这个标题滚到了视口顶部外面的时候（也即是top值为负值）。这个标题依然是被设置为选中，因为没有其他标题滚动到范围内，也就是现在依然在这个标题的内容区
           this.activeAnchor = dom.id
        }
      }
      
    }
  },
  created(){
    this.setSelectDebounce = debounce(this.setSelect, 100);//防抖函数
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },  
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  computed  :{
    addSelect(){//得到一个新的带有isSelect属性的数据
      const getCtl = (ctl = []) => {//该函数就是递归处理ctl数据，为其每一项添加isSlect属性
        return ctl.map((t) => ({//把处理好的数据返回给该函数
          ...t,
          isSelect : t.anchor === this.activeAnchor,
          children : getCtl(t.children)//对含有的子数据处理
        }))
      }
      return getCtl(this.ctl)//把该函数运行后的返回结果给addSelect,
      //最后addSelec方法就会得到一个带select的新数据，
    },
    doms(){
      // 因为文章里面的每一个标题都有一个id,并且这个值跟目录里面的anchor值是对应的。这里主要是为了获取到文章里面的标题html元素
      const doms = []//这个数组里就是ctl.anchor值对应的文章里具有这个id的html元素
      const addToDoms = (ctl) => {//该方法主要是通过ctl数据的anchor获取对应的标题元素
        for (const t of ctl) {//对ctl数据的每一项循环
        // 通过ctl数据的anchor的值作为id，获取到对应的标题html元素
          doms.push(document.getElementById(t.anchor))
          if(t.children && t.children.length){//如果数据里面还有子数据，还要对子数据进行操作
            addToDoms(t.children)//对子数据处理
          }
        }
      }
      addToDoms(this.ctl)
      return doms//把标题元素数组返回
    }
  }
}
</script>

<style lang="less" scoped>
  .article-ctl-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>