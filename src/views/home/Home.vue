<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore"
            >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control"
                     :titles="['流行','新款','精选']" @tabClick="tabClick"
                     ref="tabControl2" ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
<!--    组件不可以直接监听需要加native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import homeSwiper from "@/views/home/childComps/HomeSwiper.vue";
import recommendView from "@/views/home/childComps/RecommendView.vue";
import featureView from "@/views/home/childComps/FeatureView.vue";
import scroll from "@/components/common/scroll/Scroll.vue";

import NavBar from "@/components/common/navbar/NavBar.vue";
import tabControl from "@/components/content/TabControl/TabControl.vue";
import goodsList from "@/components/content/goods/GoodsList.vue";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {debounce} from "@/common/utils";
import Scroll from "@/components/common/scroll/Scroll.vue";
import backTop from "@/components/content/backTop/BackTop.vue";




export default {
  name: "Home",
  components:{
    homeSwiper,
    recommendView,
    featureView,
    NavBar,
    scroll,
    tabControl,
    goodsList,
    Scroll,
    backTop
  },
  //data用来存储请求过来的数据
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('home destroyed')
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    //1请求多个数据
    //具体的实现抽取到下方的methods
    this.getHomeMultidata()//必须加上this才能调用下面methods中的getHomeMultidata函数，如果不加this，还是调用import中的函数

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)
    //监听item中的图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })


  },
  methods:{

    // 事件监听相关方法
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)

    },
    contentScroll(position){
      // 1 判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 2 决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    //上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // 获取tabControl的offsetTop
      //所有的组件都有一个属性$el用于获取组件中的元素
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成下拉加载更多
        this.$refs.scroll.finishPullUp()


      })

    }


  }
}
</script>

<style scoped>
#home {
  /*padding-top: 40px;*/
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  padding-top: 44px;
}
.tab-control {
  position: relative;
  z-index: 9;
}


</style>
