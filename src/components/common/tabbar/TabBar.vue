<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
#tab-bar {
  display: flex;
   background-color: rgb(243, 228, 228);

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, .2);
}
</style>
