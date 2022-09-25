<template>
    <div class="comment-msg-container">
        <h2>{{title}}
            <span>{{subTitle}}</span>
        </h2>
        
        <!-- 子组件抛出的事件到这里，这里只是做两个子组件的拼合，所以时间还要网上抛给具体怎么用的父组件。这种连续由子组件往上抛，父组件做完给反应的情况，@submit="handleSubmit" === v-on="$listeners" ,子父组件可以互相通信，并且不用在methods里往上抛了-->
        <Form v-on="$listeners" />
        <Comment :list="list" />
    </div>
</template>

<script>
//评论区的内容分为两块，一块是写评论，一块是展示评论，该文件作为整合文件

import Form from './Form.vue'
import Comment from './Commnet.vue'

export default {
    components : {
        Form,
        Comment,
    },
    props : {
        title : {//标题
            type : String,
            default: ""
        },
        subTitle : {//标题后的评论总数
            type : String,
            default : ''
        },
        list : {//评论数据
            type :Array,
            default : () => []
        },
        isListLoading : {//加载状态
            type : Boolean,
            default : false
        }
    },
}
</script>

<style lang="less" scoped>
    
</style>