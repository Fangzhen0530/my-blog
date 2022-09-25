<template>
  <div class="test-container">
    <Loading v-if="isLoading"/>
    <button @click="isLoading = !isLoaded">stop/star</button>
  </div>
</template>

<script>
import Loading from './index.vue'
export default {
    data(){
        return {
            isLoading:true
        }
    },
    components :{
        Loading
    },
}
</script>

<style lang="less" scoped>
    .test-container{
        position:relative;
    }
</style>