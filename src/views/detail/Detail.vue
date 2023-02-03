<template>
<div id="detail">
  <detail-nav-bar class="detail-nav"></detail-nav-bar>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images = 'topImages'></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :param-info="paramInfo"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo"></detail-comment-info>

  </scroll>

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
import {getDetail,Goods,Shop,GoodsParam} from "@/network/detail";


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
    detailCommentInfo

  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{}
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
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()

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