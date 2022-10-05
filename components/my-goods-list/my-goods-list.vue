<template>
  <view>
    <view class="goods-item">
      <!-- 商品左侧的图片区域 -->
      <view class="goods-item-left">
        <!-- 为了防止有一些图片不存在，使用一张默认的空图片 -->
        <image :src="goods.goods_small_logo || defaultPic" class="goods-left-pic" mode="widthFix"></image>
      </view>
      <!-- 商品的右侧信息区域 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-right-name">{{goods.goods_name}}</view>
        <view class="goods-right-info-box">
          <!-- 商品价格 -->
          <view class="goods-right-price">￥{{goods.goods_price | tofixed}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods-list",
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        defaul: {},
      },
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      }
    },
    methods:{

    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 20rpx 20rpx;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    margin-right: 20rpx;
    .goods-left-pic{
      width: 200rpx;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-right-name{
      font-size: 28rpx;
    }
    .goods-right-price{
      font-size: 36rpx;
      color: #c00000;
    }
  }
}
</style>