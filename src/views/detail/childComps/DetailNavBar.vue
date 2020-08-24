<template>
    <nav-bar class="detail-navbar">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt @click="goBack" />
      </div>
      <div slot="center" class="detail-navbar-title">
        <span
          v-for="(item,index) in title"
          :key="index"
          @click="itemClick(index)"
          :class="{active:index==curentIndex}"
        >{{item}}</span>
      </div>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  props: {
    ccurentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      curentIndex:0
    };
  },
  watch:{
    ccurentIndex(){
      this.curentIndex=this.ccurentIndex
    }
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.curentIndex = index;
      this.$emit("itemClick", index);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  
};
</script>

<style scoped>

.detail-navbar img {
  vertical-align: middle;
  width: 17px;
}
.detail-navbar-title {
  display: flex;
  font-size: 14px;
  justify-content: space-evenly;
}
.detail-navbar span {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>
