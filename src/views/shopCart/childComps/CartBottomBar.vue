<template>
  <div class="bottom-bar">
    <div class="check-icon">
      <check-button class="check-button" :isChecked="allChecked" @colorCheck="colorCheck" />
      <span>全选</span>
    </div>

    <div class="price">合计:{{ totalPrice}}</div>

    <div class="calculate" @click="calcClick">去结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/cartCheck/CartCheckBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  data() {
    return {
      isChecked: false,
    };
  },
  props: {},
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.check)
          .reduce((preValue, item) => {
            return (preValue += item.price * item.count);
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
     return this.cartList.filter((item) => item.check).length;
    },
    allChecked() {
      return (
        this.cartList.filter((item) => !item.check).length == 0 &&
        this.cartList.length != 0
      );
    },
  },
  methods: {
    colorCheck() {
      this.isChecked = !this.isChecked;
      this.cartList.map((item) => (item.check = this.isChecked));
    },
    calcClick() {
      if (this.cartList.length == 0) {
        this.$toast.show("购物车为空！");
      } else if (!this.allChecked) {
        this.$toast.show("请选择要购买的商品！");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  line-height: 40px;
  background-color: rgb(245, 244, 244);
  display: flex;
  justify-content: space-between;
}
.check-icon {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 15%;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  width: 28%;
}
.calculate {
  position: relative;
  left: 0;
  background-color: rgb(238, 92, 35);
  width: 28%;
  text-align: center;
  font-size: 14px;
  color: #fff;
}
</style>
