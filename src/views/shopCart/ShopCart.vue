<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="shopcart-navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    
    <!-- 商品列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from './childComps/CartBottomBar';

import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
};
</script>

<style scoped>
.shopcart-navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
