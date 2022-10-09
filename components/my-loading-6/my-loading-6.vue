<template>
	<view class="loading-toast" v-if="visible">
		<view class="toast-mask">
      <!-- 中间的弹球 -->
      <view class="spinner">
        <view class="double-bounce1"></view>
        <view class="double-bounce2"></view>
      </view>
      <!-- 外侧的转圈圈 -->
     <view class="running-cricle"></view>
    </view>
		<view class="toast-tip">{{text}}</view>
	</view>
</template>

<script>
  export default {
    name:"my-loading-6",
    data() {
      return {
        timer: null
      };
    },
		props: {
			text: {
				type: String,
				default: "加载中"
			},
			visible: {
				type: Boolean,
				default: false
			}
		},
    methods:{
      
    }
  }
</script>


<style lang="scss">
.loading-toast {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  font-size: 26upx;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10upx;
}

.toast-mask{
  position: relative;
}
 
.toast-tip{
  margin-top: 20rpx;
}

// 跳动的小球 
.spinner {
  width: 30rpx;
  height: 30rpx;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  
  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ffffff;
    opacity: 0.6;
    position: absolute;
     
    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
  }
   
  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
   
  @-webkit-keyframes bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }
   
  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
}

 // 旋转的圈圈
.running-cricle {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  &::before {
      position: absolute;
      content: "";
      top: 0px; left: 0px; right: 0px; bottom: 0px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top: 3px solid white;
      border-left: 3px solid white;
      animation: rotate 1s infinite ease-out;
  }
  &::after {
      position: absolute;
      content: "";
      top: -2px; left: -2px; right: -2px; bottom: -2px;
      border-radius: 50%;
      border: 7px solid transparent;
      border-bottom: 7px solid #4c4c4c;
      border-right: 7px solid #4c4c4c;
      animation: rotate 2s infinite ease-in-out;
  }
  @-webkit-keyframes rotate {
		from {
			transform: rotatez(0deg);
      filter: hue-rotate(0deg);
		}

		to {
			transform: rotatez(360deg);
      filter: hue-rotate(360deg);
		}
  }
}

</style>