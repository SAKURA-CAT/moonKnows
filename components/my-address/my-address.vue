<template>
  <view>
      <!-- 选择收货地址的盒子 -->
      <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
        <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址 +</button>
      </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="clearAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>cunyue</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>198xxxxxx48</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
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
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    },
    data() {
      return {
        // address: {}
      };
    },
    methods:{
      ...mapMutations('m_user', ['updateAddress', 'clearAddress']),
      chooseAddress(){
        const succ = {
          errMsg:"chooseAddress:ok",
          provinceName:"陕西省",
          cityName: "西安市",
          countyName:"长安区",
          detailInfo:"西安电子科技大学",
          natfonalcode: "510000",
          postalCode: "510000",
          telNumber: "198xxxxxx48",
          userName: "cunyue"
        }
        if (succ.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
          this.updateAddress(succ)
        }
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