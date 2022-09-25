<template>
    <div class="app-container">
        <Layout>
          <template #left>
            <SiteAside />
          </template>
          <template #default>
            <router-view />
            <ToTop />
          </template>
        </Layout>
        
    </div>
</template>

<script>
import Layout from './components/Layout/index.vue'
import SiteAside from './components/SiteAside/index.vue'
import ToTop from "./components/ToTop"
export default {
  components : {
    Layout,
    SiteAside,
    ToTop
  }
}
</script>

<style lang="less" scoped>
@import './styles/general.less';
.app-container{
  .self-fill(fixed);
}

</style>
