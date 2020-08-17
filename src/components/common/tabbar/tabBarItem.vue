<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="isActive"><slot name="item-icon-active"></slot></div>
      <div v-else> <slot name="item-icon"></slot></div>
      <div :class="{active:isActive}"><slot name='item-text'></slot></div>
    </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
    };
  },
  props:{
    path:String
  },
  methods: {
    itemClick(){
      this.$router.push(this.path).catch(err=>err)
    }
  },
  computed: {
    isActive(){
      return this.$route.path==this.path
    }
  },
  components: {},
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
   font-size: 14px;

}
.tab-bar-item img {
  padding-top: 5px;
  width: 24px;
}
.active{
  color: red;
}
</style>
