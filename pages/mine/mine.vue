<template>
  <view>
    <my-loading :visible="visable"></my-loading>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        visable: false
      };
    },
    onLoad(){
      this.visable = true
      // setTimeout(()=>{
      //   this.visable = false
      // }, 100000)
    }
  }
</script>

<style lang="scss">
  
</style>
