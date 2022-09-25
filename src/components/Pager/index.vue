<template>
    <div class="pager-container" v-if="pageNumber>1" >
        <a @click="handleEvent(1)" 
        :class="{'disabled':current === 1}" 
        >|&lt;&lt;</a>

        <a @click="handleEvent(current - 1)"
        :class="{'disabled':current === 1}">&lt;&lt;</a>

        <a v-for="(n,i) in numberArr" 
        :key="i" @click="handleEvent(n)"
        :class="{'active': n === current }" @click.stop
        >
        {{n}} </a>

        <a @click="handleEvent(current + 1)"
        :class="{'disabled': current === pageNumber}">&gt;&gt;</a>

        <a @click="handleEvent(pageNumber)"
        :class="{'disabled': current === pageNumber}">&gt;&gt;|</a>
    </div>
    
</template>

<script>


export default {
    data(){
        return {
            number : 1
        }
    },
    props:{
        current : {//当前页码
            type:Number,
            default:1
        },
        total : {//总数据数
            type:Number,
            default:0
        },
        limit : {//一页显示的数据数
            type:Number,
            default:10,
        },
        visibleNumber : {//显示出的页码数
            type:Number,
            default:10,
        }
    },
    computed : {
        pageNumber(){//计算总的页数
            return Math.ceil(this.total/this.limit)
        },
        minNumber(){//计算可以显示的页码最小值
            let min = this.current - Math.ceil(this.visibleNumber/2)
            if(min < 1){
                min = 1
            }
            return min
        },
        maxNumber(){//计算可以显示的页码最大值
            let max = this.minNumber + (this.visibleNumber - 1)
            if(max > this.pageNumber){
                max = this.pageNumber
            }
            return max
        },
        numberArr(){//通过展示出的最大最小页码。生成一个要展示的所有页码的数组
            let arr = []
            for(let i = this.minNumber; i <= this.maxNumber; i ++){
                arr.push(i)
            }
            return arr
        }
    },
    methods :{
        handleEvent(page){
            
            this.$emit('pageChange',page)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
//在js模块中引入文件时，@就表示src目录
//而在css模块中引入时，~@才表示src目录
.pager-container{
    display: flex;
    justify-content: center;
    margin:20px 0;
    a{
        cursor: pointer;
        color:@primary;
        margin:0 6px;
        &.disabled{
            color:@lightWords;
            cursor: not-allowed;
        }
        &.active{
            color:@words;
            font-weight:bold ;
            cursor: text;
        }
    }
}
</style>
