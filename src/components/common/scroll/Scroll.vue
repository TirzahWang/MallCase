<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
     pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
 mounted(){
   this.scroll = new BScroll(this.$refs.wrapper,{
     click:true,
     probeType:3,
     pullUpLoad:this.pullUpLoad
   })
   this.scroll.on('scroll',(position)=>{
       this.$emit('showIcon',position)
   })
   this.scroll.on('pullingUp',()=>{
     this.$emit('showMore')
     this.scroll.finishPullUp()
   })
  
 },
 methods:{
   backTop(x,y,time=800){
     this.scroll.scrollTo(x,y,time)
   }
 }
};
</script>

<style scoped>
</style>
