<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" @scroll = "contentScroll" :probe-type ='3'>
    <ul>
      <li v-for="item in $store.state.cartList">{{item}}</li>
    </ul>
    <detail-swiper :top-images = 'topImages'></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommends" :goods="recommends"></goods-list>

  </scroll>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

</div>
</template>

<script>
import detailNavBar from "@/views/detail/childComps/DetailNavBar.vue";
import detailSwiper from "@/views/detail/childComps/DetailSwiper.vue";
import detailBaseInfo from "@/views/detail/childComps/DetailBaseInfo.vue";
import detailShopInfo from "@/views/detail/childComps/DetailShopInfo.vue";
import scroll from "@/components/common/scroll/Scroll.vue";
import detailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo.vue";
import detailParamInfo from "@/views/detail/childComps/DetailParamInfo.vue";
import detailCommentInfo from "@/views/detail/childComps/DetailCommentInfo.vue";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import goodsList from "@/components/content/goods/GoodsList.vue";
import detailBottomBar from "@/views/detail/childComps/DetailBottomBar.vue";


export default {
  name: "Detail",
  components:{
    detailGoodsInfo,
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    scroll,
    detailParamInfo,
    detailCommentInfo,
    goodsList,
    detailBottomBar

  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex: 0
    }
  },
  created() {
    //1 保存传入的iid
    this.iid = this.$route.params.iid;
    //2 根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //获取商品详情信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate !== 0 ){
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(()=>{
      //   //根据最新的数据，对应的dom是已经被渲染出来了
      //   //但是图片还没加载出来，获取的offsetTop不包含其中的图片
      //   //offset值不对的问题一般都是图片加载的原因
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs);
      //
      // })


    })
    //3 请求推荐数据
    getRecommend().then(res =>{
      this.recommends = res.data.list
    })
  },
  mounted() {
  },
  updated() {


  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      console.log(this.themeTopYs);

    },
    titleClick(index){
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      //获取y值
      const positionY = -position.y
      let length = this.themeTopYs.length
      // positionY和主题中的值进行对比
      for(let i = 0; i < length; i++){
        if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])){
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      //1 获取购物车需要的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2 将商品添加到购物车
      this.$store.dispatch('addCart',product)
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.content {
  height: calc(100% - 44px);
}

</style>