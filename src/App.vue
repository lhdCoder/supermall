<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>


  </div>
</template>

<script>

import MainTabBar from "@/components/content/mainTabBar/MainTabBar.vue";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>


<style>
@import "@/assets/css/base.css";
.main-tab-bar {
  z-index: 9;
}
</style>
