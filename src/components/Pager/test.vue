<template>
  <div>
    <MyPager :total="total" :current="current" @pageChange="handlePageChange($event)" />

  </div>
    
</template>

<script>
import MyPager from './index.vue'
export default {
  data(){
    return {
      current:1,
      total:210,
    }
  },
  components:{
    MyPager
  },
  computed:{},//计算属性，会有缓存，用于重复调用
  methods:{
    handlePageChange(page){
      this.current = page
    }
  }
}
</script>

<style scoped>
</style>>

