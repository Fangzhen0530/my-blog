<template>
    <div class="SiteAside-test">
        <SiteAside />
    </div>
</template>
<script>
import SiteAside from './index.vue'

export default {
    components : {
        SiteAside
    }
}
</script>
<style scoped lang="less">
    .SiteAside-test{
        width:250px;
        height:600px;
        border:1px solid red;
    }
</style>
