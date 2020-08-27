<template>
  <div id="detail">
    <detail-nav-bar @itemClick="itemClick" :ccurentIndex="curentIndex" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      :probeType="3"
      @contentScoll="scrollPosition"
    >
 
      <detail-swiper :images="TopImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @loadImgEvent="loadImgOk" />
      <detail-params :paramInfo="paramInfo" ref="params" />
      <detailComment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommendInfo" ref="recommend" />
    </scroll>
       <back-top @click.native="getBack" v-show="backActive"/>
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParams from "./childComps/DetailParams";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {mapActions} from 'vuex';

export default {
  /*
   **详情页不要使用keep-alive，需要每次创建(created)
   **去<router-view/>那exclude
   */
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      TopImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      positionY: [],
      nowPositionY: "",
      getThemTopYs: null,
      curentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
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
      this.detailInfo = data.detailInfo;
      //获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });
  },

  methods: {
    ...mapActions(['addCart']),
    loadImgOk() {
      //图片加载结束后刷新并保存每个tab栏的位置
      this.$refs.scroll.refresh();
      this.getThemTopYs = debounce(() => {
        this.positionY.push(0);
        this.positionY.push(this.$refs.params.$el.offsetTop - 44);
        this.positionY.push(this.$refs.comment.$el.offsetTop - 44);
        this.positionY.push(this.$refs.recommend.$el.offsetTop - 44);
        this.positionY.push(Number.MAX_VALUE);
      }, 200);
      this.getThemTopYs();
    },
    scrollPosition(position) {
      //判断backTop是否显示
      this.backActive = position.y <= -990;

      this.nowPositionY = -position.y;
      //判断scroll当前的位置，根据位置记录curentIndex值
      //1.原生做法
      /* if(this.nowPositionY>-this.positionY[1]) {
         this.curentIndex=0
         }else if(-this.positionY[2]< this.nowPositionY &&this.nowPositionY <= -this.positionY[1]){
           this.curentIndex=1
         }else if(-this.positionY[3]< this.nowPositionY && this.nowPositionY <= -this.positionY[2]){
           this.curentIndex=2
         }else if(this.nowPositionY <= -this.positionY[3]){
           this.curentIndex=3
         } */

      //2.hack做法
      let length = this.positionY.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.curentIndex !== i &&
          this.nowPositionY >= this.positionY[i] &&
          this.nowPositionY < this.positionY[i + 1]
        ) {
          this.curentIndex = i;
          this.$refs.nav.curentIndex = this.curentIndex;
          console.log(this.positionY);
        }
      }
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.positionY[index]);
    },
    //添加商品至购物车
    addToCart(){
      const product={}
      product.image=this.TopImages[0]
      product.title=this.goods.title;
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid
      product.count=1
      product.check=false
     this.addCart(product).then(res=>{
       /* setTimeout(()=>{this.isShow=false},1000) */
       this.$toast.show('添加成功！',1500)
       })
   
    }
    
  },

};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;

  /* position: absolute;
  top: 2.8rem;
  bottom: 2.09rem;
  left: 0;
  right: 0;
  overflow: hidden; */
}
</style>
