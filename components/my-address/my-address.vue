<template>
  <view>
      <!-- 选择收货地址的盒子 -->
      <view class="address-choose-box" v-if="!address_info.info.length">
        <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址 +</button>
      </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>cunyue</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>198xxxxxx48</text></view>
          <uni-icons type="arrowright" size="16" @click="chooseAddress"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    <!-- 底部的边框 -->
    <view style="border-bottom: 2px solid #f0f0f0;"></view>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address",
    computed:{
      ...mapGetters('m_user', ['addstr', 'address']),
      ...mapState('m_user', ['address_info'])
    },
    data() {
      return {
        // address: {}
      };
    },
    methods:{
      chooseAddress(){
        uni.navigateTo({
          url:"/subpkg/address_selector/address_selector"
        })
     } 
    }
  }
</script>

<style lang="scss">
// 选择收货信息的盒子
.address-choose-box{
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box{
  font-size: 24rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rpx;
  
  // 第一行，收货人和电话
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }
  // 第二行，收货地址
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: space-between;
    .row2-left {
      white-space: nowrap;
    }
  }
}

</style>