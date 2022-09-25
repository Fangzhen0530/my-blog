<template>
    <div>
        <!-- <Icon :type="n" v-for="(n,i) in banArr" :key="i"/>
         -->
         <Icon type="empty" />
    </div>
        
</template>

<script>
import Icon from './'
import { iconBank}  from './index.vue'
const banArr = Object.keys(iconBank)
export default {
    components:{
        Icon
    },
    data(){
        return {
            banArr
        }
    }
}
</script>

<style scoped>

</style>
