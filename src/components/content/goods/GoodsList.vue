<template>
  <div class="goods" v-if="goods.length!==0">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem=item />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
export default {
  name: "GoodsList",
  props:{
    goods:Array
  },
  data() {
    return {

    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
