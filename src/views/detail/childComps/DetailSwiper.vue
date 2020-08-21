<template>
    <Swiper>
      <SwiperItem v-for="(item,index) in images" :key="index" class="detail-swiper">
        <img :src="item" alt />
      </SwiperItem>
    </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "DetailSwiper",
  props: {
    images: Array,
  },
  components: { Swiper, SwiperItem },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
