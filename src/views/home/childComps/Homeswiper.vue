<template>
    <swiper ref="swiper">
        <swiper-item v-for="(item, index) in banners" :key="index">
            <a :href="item.link">
              <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name:'HomeSwiper',
  props: {
   banners: Array,
  },
  data() {
    return {
      isLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods:{
    //只需要一张图片加载完成
    imageLoad(){
      if(!this.isLoad){
      this.$emit('swiperImgLoad')
      this.isLoad=true
      }
    }
  }
};
</script>
<style></style>