<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <block v-if="checkedCount">
      <!-- 合计 -->
      <view class="amount-box">
        合计: <text class="amount">¥{{checkedGoodsAmount}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="btn-settle">结算({{checkedCount}})</view>
    </block>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      // 是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      },
    },
    name:"my-settle",
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      // label 的点击事件处理函数
      changeAllState() {
        // 修改购物车中所有商品的选中状态
        // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        this.updateAllGoodsState(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container{
  // 底部固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  // 设置宽和高
  width: 100%;
  height: 100rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  padding-left: 20rpx;
  .radio{
    display: flex;
    align-items: center; 
    radio{
      margin-right: 10rpx;
    }
  }
  .amount-box{
    
    .amount{
      color: #C00000;
      font-weight: bold;
    }
  }
  .btn-settle{
    background-color: #C00000;
    height: 100%;
    width: 33.3%;
    min-width: 200rpx;
    color: white;
    line-height: 100rpx;
    padding: 0 20rpx;
    text-align: center;
  }
}
</style>