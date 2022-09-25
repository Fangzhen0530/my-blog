<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
        <span @click="handleClick(item)" :class="{ active: item.isSelect }">
        {{ item.name }}
        </span>
         <span
        v-if="item.aside"
        @click="handleClick(item)"
        class="aside"
        :class="{ active: item.isSelect }"
      >
        {{ item.aside }}
      </span>
        <RightList :list="item.children" @selcet="handleClick" />
    </li>
  </ul> 
</template>

<script>
export default {
    name:'RightList',
    props:{
        //list列表格式： [key:value,isSelect: true ],把对象的值渲染出来，根据isSelect的值表示是否被选中
        list : {//列表数据
            type : Array,
            default : () => []//默认值是数组
        }
    },
    methods :{
        categoryId(){//这一块要根据分类（categoryId）来渲染文章以及类别选中，所以要让categoryId值是响应式的。
        return +this.$route.params.categoryId || -1

        },
        handleClick(item){//文章部分有两个地方用列表组件，要求的点击事件不一样，所以要把事件抛给父级规定
            // console.log(item)
            if(!item.isSelect){
              this.$emit('select',item)
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.active{
    color:red;
}

</style>