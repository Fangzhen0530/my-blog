<template>
    <div class="to-top-container" v-show="show" @click="handleClick">
        Top
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },
    created() {
        //触发事件，监听滚动条变化，到一定程度出现
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed() {
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    methods : {
        handleScroll(dom){//事件处理函数
            if(!dom){
                //这个组件触发展示后，如果点到其他页面会有不消失的情况
                this.show = false
                return 
            }
            //滚动条到顶端有一定距离就展示
            this.show = dom.scrollTop >= 500
        },
        handleClick(){
            //点击回到顶部时，触发事件，因为要用到滚动的dom元素，这里面没有，所以抛出给有dom元素的组件
            this.$bus.$emit("setMainScroll")
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.to-top-container {
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  text-align: center;
}
</style>