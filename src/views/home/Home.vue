<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <home-swiper :banners="banners" />
    <recommend-view :recommends='recommends'></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/Homeswiper';
import RecommendView from './childComps/RecommendView';
import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  data() {
    return {
      banners:[],
      recommends:[]
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created() {
    //请求的 是多个数据
    getHomeMultidata().then(data=>{
      this.banners=data.data.banner.list
      this.recommends=data.data.recommend.list
    })
  },
  methods: {
    SwiperImgLoad() {
      //等到 swiper的图片加载好之后
      this.tabControloffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
 #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>
