<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
    <router-view></router-view>

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
