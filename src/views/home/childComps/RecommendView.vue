<template>
  <div class="recommend">
      <a :href="item.link" v-for="(item,index) in recommends" :key="index" class="recommend-item">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom:10px solid #eee;
  text-align: center;
}
.recommend-item{
  flex:1;
}
.recommend-item img{
  width: 80%;
  margin-bottom: 10px;
  vertical-align: left;
}
.recommend-item:last-child img{
  margin-right: 8px;
}
</style>
