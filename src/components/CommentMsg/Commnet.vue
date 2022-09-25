<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar1" :size="44" />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{ time(item.createDate, true) }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import {time} from '@/utils'
import Avatar from '../Avatar/index.vue'
export default {
  props :{
    list : {
      type : Array,
      default : () => []
    }
  },
  components  :{
    Avatar,
  },
  methods : {
    time
  }

}
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
.data-list-container {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  border-bottom: 1px solid lighten(@gray, 20%);
  padding: 15px 0;
}
.avatar-container {
  margin-right: 15px;
}
.nickname {
  color: darken(@success, 10%);
  margin-bottom: 10px;
}
.content {
  font-size: 14px;
}
.data {
  flex: 1 1 auto;
  position: relative;
  margin :0 5px;
}
.time {
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 12px;
  color: @gray;
}
</style>