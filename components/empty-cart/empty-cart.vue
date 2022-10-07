<template>
  <view class="goods-not-exists">
    <uni-icons color="#dddddd" type="cart" size="100"></uni-icons>
    <text>{{tips}}</text>
  </view>
</template>

<script>
  export default {
    name:"empty-cart",
    props: {
      tips:{
        type: String,
        default: "Oh,该类别暂时没有商品哦～"
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  .goods-not-exists{
    width: 400rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    text{
      font-size: 30rpx;
      color: #dddddd;
    }
  }
</style>