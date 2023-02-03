<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class = 'header-more'>
        更多
        <i calss="arrow-right"></i>
      </div>
    </div>

    <div class = "info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>

</template>

<script>
import {getall} from "@/common/utils";

export default {
  name: "DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showDate(value){
      // 将时间搓进行格式化
      return getall(value * 1000)

    }
  }
}
</script>

<style scoped>

</style>