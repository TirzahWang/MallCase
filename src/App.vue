<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

export default {
  name: "App",
 data() {
   return {
     path:''
   }
 },
  components: {
    MainTabBar,
  },
  created(){
      console.log(this.$route);
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
