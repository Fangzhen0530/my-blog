<template>
    <div class="contact">
        <Contact />
    </div>
</template>

<script>
import Contact from './index.vue'
import '@/styles/global.less'
export default {
    components : {
        Contact
    }
}
</script>
<style scoped lang="less">
    .contact{
        width:400px;
        height:400px;
        background: #000;
        padding-top:200px;
    }
</style>
