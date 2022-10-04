<template>
	<!-- visible控制toast的显隐，text为提示文本 -->
	<view class="loading-toast" v-if="visible">
		<view class="toast-mask"></view>
		<view class="toast-tip">{{text}}</view>
	</view>
</template>

<script>
	export default {
		name: "my-loading-1",
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

<style>
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

	.toast-mask {
		width: 50upx;
		height: 50upx;
		border: 3px solid #fff;
		border-radius: 50%;
		margin: 0 6px;
		display: inline-block;
		vertical-align: middle;
		clip-path: polygon(0% 0%, 100% 0%, 100% 40%, 0% 40%);
		animation: rotate 1s linear infinite;
		margin-bottom: 36upx;
	}

/* 适配safari或者chrome */
	@-webkit-keyframes rotate {
		from {
			transform: rotatez(0deg);
		}

		to {
			transform: rotatez(360deg);
		}
	}

	@keyframes rotate {
		from {
			transform: rotatez(0deg);
		}

		to {
			transform: rotatez(360deg);
		}
	}
</style>