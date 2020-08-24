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
      default :0
    },
     pullUpLoad:{
      type:Boolean,
      default :false
    }
  },
 mounted(){
   this.scroll = new BScroll(this.$refs.wrapper,{
     click:true,
     probeType:3,
     pullUpLoad:this.pullUpLoad
   })
   if(this.probeType === 2 || this.probeType===3){
   this.scroll.on('pullingUp',()=>{
     this.$emit('showMore')
     this.scroll.finishPullUp()
   })
   
   }
   if(this.pullUpLoad){
     //指头下拉事件
     this.scroll.on('scroll',(position)=>{
       this.$emit('contentScoll',position)
   })
   }
 },
 methods:{
   scrollTo(x,y,time=800){
     this.scroll && this.scroll.scrollTo(x,y,time)
   },
   refresh(){
     this.scroll && this.scroll.refresh()
     
   }
 }
};
</script>

<style scoped>
</style>
