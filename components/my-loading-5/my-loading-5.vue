<template>
	<view class="loading-toast" v-if="visible">
		<view class="toast-mask">
      <!-- 中间的弹球 -->
      <view class="spinner">
        <view class="double-bounce1"></view>
        <view class="double-bounce2"></view>
      </view>
      <!-- 外侧的转圈圈 -->
     <view class="circle_process">
       <view class="wrapper right">
         <view class="circle rightcircle"></view>
       </view>
       <view class="wrapper left">
         <view class="circle leftcircle"></view>
       </view>
     </view>
    </view>
		<view class="toast-tip">{{text}}</view>
	</view>
</template>

<script>
  export default {
    name:"my-loading-5",
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
.circle_process {
  position: relative;
  width: 80rpx;
  height: 80rpx;
}
.circle_process .wrapper {
  width: 40rpx;
  height: 80rpx;
  position: absolute;
  top: 0;
  overflow: hidden;
}
.circle_process .right {
  right: 0;
}
.circle_process .left {
  left: 0;
}
.circle_process .circle {
  width: 80rpx;
  height: 80rpx;
  border: 6rpx solid transparent;
  border-radius: 50%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  transform: rotate(-135deg);
}
.circle_process .rightcircle {
  border-top: 6rpx solid white;
  border-right: 6rpx solid white;
  right: 0;
  -webkit-animation: circle_right 4s ease-in-out infinite;
}
.circle_process .leftcircle {
  border-bottom: 6rpx solid white;
  border-left: 6rpx solid white;
  left: 0;
  -webkit-animation: circle_left 4s ease-in-out infinite;
}
@-webkit-keyframes circle_right {
  0% {
    -webkit-transform: rotate(-135deg);
  }
  25%{
    -webkit-transform: rotate(45deg);
  }
  50%{
    -webkit-transform: rotate(225deg);
  }
  75%, 100%{
    -webkit-transform: rotate(405deg);
  }
}
@-webkit-keyframes circle_left {
  0%{
    -webkit-transform: rotate(-215deg);
  }
  25%{
    -webkit-transform: rotate(-135deg);
  }
  50%{
    -webkit-transform: rotate(45deg);
  }
  75% {
    -webkit-transform: rotate(225deg);
  }
  100%{
    -webkit-transform: rotate(405deg);
  }
}
</style>