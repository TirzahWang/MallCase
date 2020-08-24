<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @goodsClick="getItem"
      ref="tabControl1"
      class="tab-control"
      v-show="istabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @contentScoll="contentScoll"
      :pull-up-load="true"
      @showMore="showMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @goodsClick="getItem" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" ref="goodsList"></goods-list>
    </scroll>
    <back-top @click.native="getBack" v-show="backActive"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/Homeswiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin} from "common/mixin";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      istabFixed: false,
      goodsListPositionY: 0,
    };
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  

  methods: {
    /* 监听事件处理 */
    getItem(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.scroll.scrollTo(0,-this.goodsListPositionY+40,0)
    },
   
    contentScoll(position) {
      //1.判断backTop是否显示
      this.backActive = position.y <= -990;

      //2.决定tabcontrol是否吸顶（position：fixed）
      this.istabFixed = -position.y > this.tabOffsetTop;
    },
    showMore() {
      this.getHomeGoods(this.currentType);
    },

    swiperImgLoad() {
      //当轮播图加载完成后获取tabcontrol的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      
      //计算出goodsList的offsetTop
      this.goodsListPositionY=this.$refs.goodsList.$el.offsetTop
     
    },

    /* 监听服务器发送请求 */
    getHomeMultidata() {
      getHomeMultidata().then((data) => {
        this.banners = data.data.banner.list;
        this.recommends = data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((data) => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...data.data.list);
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* .content{
   margin-top: 44px;
  height:calc(100% - 93px) ;
    overflow: hidden;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
