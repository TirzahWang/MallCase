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
     isHidden:false
   }
 },

  components: {
    MainTabBar,
  },
  watch:{
    $route(){
      if(this.$route.matched[0].path==='/detail/:iid'){
        this.isHidden=true
      }
    }
  },
  
};
</script>

<style>
@import "./assets/css/base.css";
</style>
