<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <!--        注意需要加冒号，因为使用了变量里面的属性-->
      <a :src="item.link">
        <img :src="item.image" alt="">
      </a>

    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem,
  }
}
</script>

<style scoped>

</style>