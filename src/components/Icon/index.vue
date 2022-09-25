<template>
    <i class="iconfont" :class="fontClass"></i>
    <!-- 这里V-bind绑定的class的值，接收的就是App里面应用组件是传递的type值 -->
</template>

<script>
export const iconBank = {
    home: "iconzhuye",
    success: "iconzhengque",
    error: "iconcuowu",
    close: "iconguanbi",
    warn: "iconjinggao",
    info: "iconxinxi",
    blog: "iconblog",
    code: "iconcode",
    about: "iconset_about_hov",
    weixin: "iconweixin",
    mail: "iconemail",
    github: "icongithub",
    qq: "iconsign_qq",
    arrowUp: "iconiconfonticonfonti2copy",
    arrowDown: "iconiconfonticonfonti2",
    empty: "iconempty",
    chat: "iconliuyan",
}

export default {
    props:{
        type:{
            type:String,
            required:true
        }
    },
    computed : {
        fontClass(){//计算属性，通过获取到接收的type值，去icon库里面找对应的图标
            return iconBank[this.type]
        }
    }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2164449_nalfgtq7il.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}

</style>
