<template>
	<view class="loading-toast" v-if="visible">
		<view class="toast-mask">
      <div class="spinner">
      </div>
    </view>
		<view class="toast-tip">{{text}}</view>
	</view>
</template>

<script>
  export default {
    name:"my-loading-3",
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
    background-color: #fff;
    -webkit-animation: rotateplane 1.2s infinite ease-in-out;
    animation: rotateplane 1.2s infinite ease-in-out;
  }
   
  @keyframes rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
    } 50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
    } 100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>