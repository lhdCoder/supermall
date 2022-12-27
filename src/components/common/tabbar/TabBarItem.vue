<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    动态展示图片不能写死使用slot-->
<!--    v-if决定其是否展示-->
    <div v-if="!isActive"><slot name = 'item-icon'></slot></div>
    <div v-else><slot name = 'item-icon-active'></slot></div>
    <div :style="activeStyle"><slot name = 'item-text'></slot></div>

<!--    <img src="../../assets/img/tabbar/home.svg">-->
<!--    <div>首页</div>-->
  </div>

</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return{
      //isActive:true
    }
  },
  computed:{
    isActive(){
      //判断激活路径和当前路径是否相同，相同的话变换激活图片，参数传递给v-if
      return this.$route.path == this.path
    },
    activeStyle(){
      return this.isActive? {color:this.activeColor} :{}
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path!==this.path){
        this.$router.replace(this.path)
      }

    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 3px;
}
</style>
