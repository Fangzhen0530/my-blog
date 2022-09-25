<template>
    <ul class="contact-container">
        <li>
            <a>
                <Icon type="github" class="icon" />
                <span>github</span>
            </a>
            
        </li>
        <li>
            <a href="mailto:1362998253@qq.com">
                <Icon type="mail" class="icon" />
                <span>123456@qq.com</span>
            </a>

        </li>
        <li class="pop-qq">
            <a href="tencent://message/?Menu=yes&uin=1362998253">
                <Icon type="qq" class="icon" />
                <span>123456</span>
            </a>
            <div class="pop qq">
                <img :src="qqUrl" alt="">
            </div>
        </li>
        
        <li class="pop-weixin">
            <a href="">
               <Icon type="weixin" class="icon" />
                <span>v123456</span> 
            </a>
            <div class="pop weixin">
                <img :src="weixinUrl" alt="">
            </div>
        </li>
    </ul>
</template>
<script>
import Icon from '../Icon/index.vue'
export default {
    props : ['qqUrl','weixinUrl'],
    components : {
        Icon
    }
}
</script>
<style scoped lang="less">
@import '~@/styles/var.less';
.contact-container{
    margin:0;
    padding:20px;
    color:@gray;
    li{
        height:30px;
        line-height: 30px;
        margin:14px 0;
        position:relative;
    }
    .pop-qq:hover{
        .qq{
                transform: scaleY(1);
            }
    }
    .pop-weixin:hover{
        .weixin{
                transform: scaleY(1);
            }
    }
    a{
        display: flex;
        align-items: center;
        font-size:14px;
        cursor: pointer;
    }
    .icon{
        font-size:26px;
        width:36px;
    }
    img{
        width:150px;
        height:150px;
    }
    .pop{
        position:absolute;
        background:#fff;
        left:0;
        padding:10px 15px;
        border-radius: 5px;
        transform: scaleY(0);
        transform-origin: center bottom;
        transition: .3s;
        bottom:35px;
        &::after{
            content:"";
            position:absolute;
            left:50%;
            transform: translateX(-50%) rotate(45deg);
            width:8px;
            height:8px;
            background :#fff;
            bottom:-4px;
        }
    }
}
</style>
