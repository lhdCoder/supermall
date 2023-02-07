<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import navBar from "@/components/common/navbar/NavBar.vue";
import CartList from "@/views/cat/childComps/CartList.vue";
import {mapGetters} from 'vuex'
export default {
  name: 'Cart',
  components:{
    navBar,
    CartList
  },
  computed:{
    //方法一：
    ...mapGetters(['cartLength'])
    //方法2，将cartLength改成length
    // ...mapGetters({
    //   length:'cartLength'
 // })
}
};
</script>

<style scoped>
#cart {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.cart-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

</style>
