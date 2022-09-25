<template>
    <div class="siteAside-container">
        <Avatar :url="data.avatar1" class="avatar" />
        <h1 class="title">My blog</h1>
        <Menu />
        <Contact 
            :qqUrl="data.qqQrCode1" 
            :weixinUrl="data.weixinQrCode1" />
        
    </div>
</template>
<script>
import Avatar from '@/components/Avatar/index.vue'
import Contact from '@/components/Contact/index.vue'
import Menu from '@/components/Menu/index.vue'
import {getMyInfo} from '@/api/myInfo.js'
import {server_URL} from "@/utils/getUrl.js"
// import '@/styles/global.less'
export default {
    data(){
        return {
            data:{}
        }
    },
    components : {
        Avatar,
        Contact,
        Menu
    },
    created(){
        this.fetchData()
    },
    methods : {
        async fetchData(){
            const res = await getMyInfo()
            this.data = res
            this.data.avatar1 = server_URL + this.data.avatar
            this.data.qqQrCode1 = server_URL + this.data.qqQrCode
            this.data.weixinQrCode1 = server_URL + this.data.weixinQrCode
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
    .siteAside-container{
        width:100%;
        height:100%;
        background:@dark;
        padding:20px 0;
        box-sizing: border-box;
        overflow-x:hidden;
        overflow-y: auto;
        .avatar{
            margin:0 auto;
        }
        .title{
            text-align: center;
            color:#fff;
        }
    }
</style>
