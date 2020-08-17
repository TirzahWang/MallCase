<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
    :key="index" class="tab-control-item" 
    :class="{active:index==currentIndex}"
    @click=activeItem(index)>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods:{
    activeItem(index){
      this.currentIndex=index
      this.$emit('goodsClick',index)
    }
  },
  components: {

  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  font-size: 15px;
    text-align: center;
  height: 40px;
  line-height: 40px;
}
.tab-control-item{
  flex: 1;
  background-color:#fff ;
  }
.tab-control-item span{
  padding: 4px;
}
.active{
  color: var(--color-high-text);  
  }
.active span{
  border-bottom:3px solid var(--color-high-text);
}
</style>
