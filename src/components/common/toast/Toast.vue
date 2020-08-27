<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
 data() {
   return {
     message:'',
    isShow:false
   }
  },
  methods:{
    show(message,duration=2000){
      this.isShow=true
      this.message=message
      let timer=null
        clearTimeout(timer)
      timer=setTimeout(()=>{
        this.isShow=false
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top:50%;
  left: 50%;
  color: white;
  transform: translate(-50%,-50%);
  background-color: rgba(0, 0, 0, .7);
  border-radius: 15%;
  padding: 5px;
  z-index: 10;
}
</style>
