<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}" @click="mySearchHandler()">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      // 背景颜色
      bgcolor:{
        type: String,
        default: '#00b65f'
      },
      // 圆角尺寸
      radius:{
        type: Number,
        default: 18  // px
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      mySearchHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background-color: #00b65f;
  display: flex;
  align-items: center; 
  padding: 0 20rpx;
  .my-search-box{
    height: 72rpx;
    background-color: #ffffff;
    // border-radius: 36rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder{
      font-size: 30rpx; 
      margin-left: 10rpx;
    }
  }
}
</style>