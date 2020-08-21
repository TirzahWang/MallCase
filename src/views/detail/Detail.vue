<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="content" ref="detailScroll">
      <detail-swiper :images="TopImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shopInfo" />
     <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgOk" />
    </scroll>
  </div>
</template>

<script>
import { getDetail, Goods, Shop,GoodsParam } from "network/detail";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImages: [],
      goods: {},
      shopInfo: {},
      detailInfo:{}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo
  },
  created() {
    this.iid = this.$router.currentRoute.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //获取顶部轮播图数据
      this.TopImages = data.itemInfo.topImages;
      //获取商品详细信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取商家信息
      this.shopInfo = new Shop(data.shopInfo);
      //获取商品详情信息
      this.detailInfo=data.detailInfo

    });
  },
  methods: {
    loadImgOk(){
      this.$refs.detailScroll.refresh()
      console.log(111);
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content{
  height: 100vh;
   overflow: hidden;
}
</style>
