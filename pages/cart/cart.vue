<template>
  <view>
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
