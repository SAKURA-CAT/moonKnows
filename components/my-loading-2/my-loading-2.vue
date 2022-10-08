<template>
	<view class="loading-toast" v-if="visible">
		<view class="toast-mask">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </view>
		<view class="toast-tip">{{text}}</view>
	</view>
</template>

<script>
  export default {
    name:"my-loading-2",
		props: {
			text: {
				type: String,
				default: "加载中"
			},
			visible: {
				type: Boolean,
				default: false
			}
		}
  }
</script>

<style lang="scss">
	.loading-toast {
		min-width: 200rpx;
		min-height: 200rpx;
		max-width: 500rpx;
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
  
.spinner {
		width: 60upx;
		height: 60upx;
    position: relative;
    margin: 0 6px;
    margin-bottom: 36upx;
}
 
.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
   
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
</style>