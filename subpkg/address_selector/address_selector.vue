<template>
  <view>
    <block v-if="address_info.info.length">
      <view class="address-info-list" v-for="(address, i) in address_info.info" :key="i">
        <view class="address-info-container">
          <block v-if="manageModel">
            <view class="manage-radio">
              <radio color="#00b65f" style="margin-right: 10rpx;"></radio>
            </view>
          </block>
          <view class="address-info-box" :style="{width: address_info_box_width}">
            <view class="address-info">
              <view class="address-user-info">
                <text>{{address.userName}}</text>
                <text>{{address.telNumber}}</text>
              </view>
              <view class="address-detail-info">
                <text>{{addstr}}</text>
              </view>
            </view>
            <view class="address-manage">
              <view class="default-radio" v-if="!manageModel">
                <radio :checked="address.defaultSelected" color="#00b65f" style="margin-right: 10rpx;"></radio>
                <text>默认寄件地址</text>
              </view>
              <view class="manage-btns">
                <view class="manage-btn">
                  <uni-icons type="compose" size="20" color="#a3a3a3"></uni-icons>
                  <text>编辑</text>
                </view>
                <view class="manage-btn">
                  <uni-icons type="trash" size="20" color="#a3a3a3">></uni-icons>
                  <text>删除</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <block v-else>
      哎呀，你还没有地址噢
    </block>
    <view class="selector-menu-container">
      <view class="menu-manage" @click="changeManageModel">
        <text>管理</text>
      </view>
      <view class="menu-addAddress">
        <text>新增地址</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address-list",
    computed:{
      ...mapState('m_user', ['address_info']),
      ...mapGetters('m_user', ['addstr']),
      address_info_box_width(){
        return this.manageModel? 91 + '%': 100 + '%'
      }
    },
    data() {
      return {
        manageModel: false
      };
    },
    onReady(){
      console.log(this.address_info)
    },
    methods:{
      changeManageModel(){
        this.manageModel = !this.manageModel
      }
    }
  }
</script>

<style lang="scss">
page{
  background-color: #f3f3f3;
}

.address-info-list{
  padding-bottom: 200rpx;
  .address-info-container{
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 20rpx 20rpx;
    .address-info-box{
      background: white;
      border-radius: 30rpx;
      color: #a3a3a3;
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      
      
      
      .address-info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10rpx 20rpx;
        .address-user-info{
          display: flex;
          align-items: center;
          text{
            padding-right: 20rpx;
            margin-bottom: 10rpx;
          }
          text:nth-child(1){
            color: black;
            
            font-size: 35rpx;
          }
          text:nth-child(2){
            font-size: 28rpx;
          }
        }
        .address-detail-info{
          font-size: 28rpx;
          padding-bottom: 20rpx;
          border-bottom: 1rpx solid rgba(129, 129, 129, 0.3);
          //文字不允许换行，超出显示...
          white-space: nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
        }
      }
      .address-manage{
        padding: 5rpx 20rpx;
        display: flex;
        justify-content: space-between;
        font-size: 30rpx;
        .default-radio{
          display: flex;
          align-items: center;
          radio{
            zoom: 0.7;
          }
        }
        .manage-btns{
          margin-left: auto;
          display: flex;
          justify-content: space-around;
          .manage-btn{
            display: inline-block;
            margin-left: 50rpx;
            uni-icons{
              display: inline-block;
              vertical-align: -2px;
            }
          }
        }
      }
    }    
  }
}
  
.selector-menu-container{
  // 底部固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  // 设置宽和高
  width: 100%;
  height: 170rpx;
  background-color: white;
  padding-bottom: 40rpx;
  // 内部布局
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 35rpx;
  // padding-top: ;
  // font-weight: 350;
  .menu-manage{
    margin-left: 30rpx;
    border-radius: 9999px;
    border: 1px solid black;
    height: 100rpx;
    width: 30%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    text{
      margin: 20rpx 30rpx;
      color: black;
    }
  }
  .menu-addAddress{
    margin-right: 30rpx;
    border-radius: 9999px;
    border: 1px solid transparent;
    width: 50%;
    height: 100rpx;
    display: flex;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(to right, #66CC33 , 20%, #00b65f);;
    text{
      color: white;
      margin: 20rpx 50rpx;
    }
  }
}

</style>