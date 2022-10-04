<template>
  <view>
    <my-loading-2 :visible="visible"></my-loading-2>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    },
    onReady(){
      this.visible = true
    }
  }
</script>

<style lang="scss">
  
</style>
