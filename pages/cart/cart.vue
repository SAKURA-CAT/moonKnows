<template>
  <view>
    <my-loading-3 :visible="visable"></my-loading-3>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        visable: true
      }
    },
    methods: {
      
    },
    onReady(){
      this.visable = true
      setTimeout(()=>{
        this.visable = false
      }, 3000)
    }
  }
</script>

<style>

</style>
