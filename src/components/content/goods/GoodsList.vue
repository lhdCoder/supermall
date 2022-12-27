<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import goodsListItem from "@/components/content/goods/GoodsListItem.vue";
export default {
  name: "GoodList",
  components:{
    goodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }

  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}


</style>