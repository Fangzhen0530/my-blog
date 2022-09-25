<template>
    <div class="menu-container">
        <RouterLink v-for="item in menus" :key="item.address"
        :to="{name : item.name} "
        :exact="item.exact"
        active-class="active"
        exact-active-class=""
         >
            <Icon class="icon" :type="item.type" />
            <span>{{item.title}}</span>
        </RouterLink>
        
    </div>
</template>
<script>
import Icon from '../Icon/index.vue'
export default {
    components : {
        Icon
    },
    data(){
        return {
            menus : [
                {
                    name:"Home",
                    type:"home",
                    title:"首页",
                    exact:true
                },
                {
                    name:"Blog",
                    type:"blog",
                    title:"文章",
                    exact:false
                },
                {
                    name:"About",
                    type:"about",
                    title:"关于我",
                    exact:true
                },
                // {
                //     name:"Project",
                //     type:"code",
                //     title:"项目&效果",
                //     exact:true
                // },
                {
                    name:"Message",
                    type:"chat",
                    title:"留言板",
                    exact:true
                },

            ]
        }
    },
}
</script>
<style scoped lang="less">
@import '~@/styles/var.less';
    .menu-container{
        color: @gray;
        margin: 24px 0;
        a{
            padding: 0 50px;
            display: block;
            display: flex;
            align-items: center;
            cursor: pointer;
            height: 45px;
            .icon{
                    width:24px;
                }
           &:hover{
                color:#fff;
            }
            &.active{
                background:#2d2d2d;
            }
        }
        
        
    }
</style>
