<template>
  <!-- 弹窗区域，背景是一个默认颜色为灰黑色的遮罩 -->
  <view class="loading-toast" v-if="visible">
    <!-- 加载动画最外层 -->
    <view class="toast-mask">
      <!-- 中间的弹球，一共有两个，交替展现 -->
     <view class="spinner">
        <view class="double-bounce1"></view>
        <view class="double-bounce2"></view>
      </view>
      <!-- 运动的圆圈，有四个 -->
      <view class="running-cricle">
        <view class="wrapper wrapper-1">
          <view class="circle"></view>
        </view>
        <view class="wrapper wrapper-2">
          <view class="circle"></view>
        </view>
        <view class="wrapper wrapper-3">
          <view class="circle"></view>
        </view>
        <view class="wrapper wrapper-4">
          <view class="circle"></view>
        </view>
      </view>
    </view>
    <!-- 加载动画的提示 -->
    <view class="toast-tip">{{text}}</view>
  </view>
</template>

<script>
  export default {
    name:"my-loading-7",
    props:{
      text: {
      	type: String,
      	default: "加载中"
      },
      visible: {
      	type: Boolean,
      	default: false
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">

// 自定义属性
.loading-toast{
  --toast-width: 200rpx;
  --toast-height: 200rpx;
}
.spinner{
  --spinner-width: 30rpx;
  --spinner-height: 30rpx;
  --spinner-anim-time: 4s;
}
.running-cricle{
  --circle-diameter: 80rpx;
  --circle-thickness: 8rpx;
  --circle-anim-time-1: 2s;
  --circle-anim-time-2: 2s;
  --circle-anim-time-3: 2s;
  --circle-anim-time-4: 2s;
}


// 主动画  
.loading-toast {
  // 弹出框的总大小css会根据props进行动态绑定
  width: var(--toast-width);
  height: var(--toast-height);
  // felx布局，且为纵向排列
  display: flex;
  flex-direction: column;
  // 横纵为居中
  align-items: center;
  justify-content: center;
  // 规定绝对位置，为整个画面的中间
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // 遮盖在所有元素之上
  z-index: 9999;
  // 其他的一些样式设计
  font-size: 26rpx;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15rpx;
  // 动画区域
  .toast-mask{
    position: relative;
  }
  // 
  .toast-tip{
    margin-top: 20rpx;
  }
}
// 跳动小球
.spinner {
  // 小球的大小
  width: var(--spinner-width);
  height: var(--spinner-height);
  // 层叠在最上面
  z-index: 999;
  // 绝对布局，在toast-mask中间
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // 动画
  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ffffff;
    opacity: 0.6;
    position: absolute;
     
    -webkit-animation: bounce var(--spinner-anim-time) infinite ease-in-out;
    animation: bounce var(--spinner-anim-time) infinite ease-in-out;
  }
   
  .double-bounce2 {
    -webkit-animation-delay: calc(var(--spinner-anim-time) / -2);
    animation-delay: calc(var(--spinner-anim-time) / -2);
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
.running-cricle{
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  position: relative;
  .wrapper{
    width: calc(var(--circle-diameter) / 2);
    height: calc(var(--circle-diameter) / 2);
    position: absolute;
    overflow: hidden;
  }
  .wrapper-1{
    top:0;
    left: 0;
    .circle{
      border-top: var(--circle-thickness) solid white;
      border-left: var(--circle-thickness) solid white;
      -webkit-animation: circle_right var(--circle-anim-time-1) linear infinite;
      animation: circle_right var(--circle-anim-time-1) infinite linear;
    }
  }
  .wrapper-2{
    top: 0;
    right: 0;
    .circle{
      left: -100%;
      border-top: var(--circle-thickness) solid white;
      border-right: var(--circle-thickness) solid white;
      -webkit-animation: circle_right var(--circle-anim-time-2) linear infinite;
      animation: circle_right var(--circle-anim-time-2) infinite linear;
    }
  }
  .wrapper-3{
    bottom: 0;
    left: 0;
    .circle{
      top: -100%;
      border-bottom: var(--circle-thickness) solid white;
      border-left: var(--circle-thickness) solid white;
      -webkit-animation: circle_right var(--circle-anim-time-3) linear infinite;
      animation: circle_right var(--circle-anim-time-3) infinite linear;
    }
  }
  .wrapper-4{
    bottom: 0;
    right: 0;
    .circle{
      left: -100%;
      top: -100%;
      border-bottom: var(--circle-thickness) solid white;
      border-right: var(--circle-thickness) solid white;
      -webkit-animation: circle_right var(--circle-anim-time-4) linear infinite;
      animation: circle_right var(--circle-anim-time-4) infinite linear;
    }
  }
}
// 圆的形状
.circle {
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  border-radius: 50%;
  // border: var(--circle-thickness) solid transparent;
  box-sizing: border-box;
  position: absolute;
}



@-webkit-keyframes circle_right {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50%{
    -webkit-transform: rotate(180deg);
  }
  100%{
    -webkit-transform: rotate(360deg);
  }
}

@keyframes circle_right {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50%{
    -webkit-transform: rotate(180deg);
  }
  100%{
    -webkit-transform: rotate(360deg);
  }
}


</style>