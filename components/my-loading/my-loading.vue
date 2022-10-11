<template>
  <!-- 弹窗区域，背景是一个默认颜色为灰黑色的遮罩 -->
  <view class="loading-toast" v-if="visible">
    <!-- 加载动画最外层 -->
    <view class="toast-mask">
      <!-- 中间的弹球，一共有两个，交替展现 -->
      <view class="spinner">
        <!-- 第一个球，color-1-->
        <view class="double-bounce1"></view>
        <!-- 第二个球，color-2 -->
        <view class="double-bounce2"></view>
        <!-- 第三个球，color-3 -->
        <view class="double-bounce3"></view>
      </view>
      <view class="running-cricle">
        <!-- 第一个圆圈，color-1 -->
        <view></view>
        <!-- 第二个圆圈，color-2 -->
        <view></view>
        <!-- 第三个圆圈，color-3 -->
        <view></view>
      </view>
    </view>
    <!-- 加载动画的提示 -->
    <view class="toast-tip">{{text}}</view>
  </view>
</template>

<script>
  export default {
    name:"my-loading",
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

<style lang="scss" scoped>
// 三种默认的颜色
$df-color-1: #fff;
$df-color-2: #9a95eb;
$df-color-3: #f3d3ee;
  
.loading-toast{
  // 弹窗整体的宽和高
  // --toast-width: 200rpx;
  // --toast-height: 200rpx;
  // 定义全局的样式
  // 字体颜色和大小
  // --toast-font-size: 26rpx;
  // --toast-font-color: #fff;
  // 背景颜色和radius
  // --toast-bkg: rgba(0, 0, 0, 0.7);
  // --toast-radius: 15rpx;
  // 加载动画的颜色
  // --color-1: #fff;
  // --color-2: #9a95eb;
  // --color-3: #f3d3ee;
  // 动画的周期，建议不要更改此参数
  // --loading-anim-time: 2s;
}
.spinner{
  // 小球的直径
  // --spinner-diameter: 25rpx;
}
.running-cricle{
  // 圆圈的相关参数，直径和厚度
  // --circle-diameter: 80rpx;
  // --circle-thickness: 6rpx;
}

  
  
// 其他配置
// 主窗口 
.loading-toast {
  // 弹出框的总大小css会根据props进行动态绑定
  width: var(--toast-width, 200rpx);
  height: var(--toast-height, 200rpx);
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
  font-size: var(--toast-font-size, 26rpx);
  color: var(--toast-font-color, #fff);
  background: var(--toast-bkg, rgba(0, 0, 0, 0.7));
  border-radius: var(--toast-radius, 15rpx);
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
  width: var(--spinner-diameter, 25rpx);
  height: var(--spinner-diameter, 25rpx);
  // 层叠在最上面
  z-index: 999;
  // 绝对布局，在toast-mask中间
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // 动画
  .double-bounce1, .double-bounce2, .double-bounce3 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: scale(0.0);
    position: absolute;
  }
  
  .double-bounce1{
    background-color: var(--color-1, $df-color-1);
    -webkit-animation: bounce1 var(--loading-anim-time, 2s) infinite ease-out;
    animation: bounce1 var(--loading-anim-time, 2s) infinite ease-out;
  }
   
  .double-bounce2 {
    background-color: var(--color-2, $df-color-2);
    -webkit-animation: bounce2 var(--loading-anim-time, 2s) infinite ease-out;
    animation: bounce2 var(--loading-anim-time, 2s) infinite ease-out;
  }
  
  .double-bounce3 {
    background-color: var(--color-3, $df-color-3);
    -webkit-animation: bounce3 var(--loading-anim-time, 2s) infinite ease-out;
    animation: bounce3 var(--loading-anim-time, 2s) infinite ease-out;
  }
   
  // 第一个小球的动画
  @-webkit-keyframes bounce1 {
    100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }
   
  @keyframes bounce1 {
    100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 
    40% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
  
  // 第二个小球的动画
  @-webkit-keyframes bounce2 {
    20%, 100% { -webkit-transform: scale(0.0) }
    50%, 60% { -webkit-transform: scale(1.0) }
  }
   
  @keyframes bounce2 {
    20%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 
    40%, 60% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
  
  // 第三个小球的动画
  @-webkit-keyframes bounce3 {
    35%, 100% { -webkit-transform: scale(0.0) }
    60%, 65% { -webkit-transform: scale(1.0) }
  }
   
  @keyframes bounce3 {
    35%, 100%{
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 
    60%, 65% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
}

// 旋转的圈圈
.running-cricle{
  position: relative;
  width: var(--circle-diameter, 80rpx);
  height: var(--circle-diameter, 80rpx);
}
.running-cricle view {
  display: block;
  position: absolute;
  width: var(--circle-diameter, 80rpx);
  height: var(--circle-diameter, 80rpx);
  box-sizing: border-box;
  border: var(--circle-thickness, 6rpx) solid transparent;
  border-radius: 50%;
  border-color: var(--color-1, $df-color-1) transparent transparent var(--color-1, $df-color-1);
  clip-path: polygon(50% 50%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
  transform: rotate(-45deg);
  // clip-path: polygon(75% 0%, 100% 0%, 50% 50%, 50% 50%);
  animation: running-cricle var(--loading-anim-time, 2s) cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.running-cricle view:nth-child(1) {
  border-color: var(--color-2, $df-color-2) transparent transparent var(--color-2, $df-color-2);
  animation-delay: 0.1s;
}
.running-cricle view:nth-child(2) {
  border-color: var(--color-3, $df-color-3) transparent transparent var(--color-3, $df-color-3);
  animation-delay: 0.05s;
}
@keyframes running-cricle {
  // 长度变化部分
  //变短
  60%, 100%{
    clip-path: polygon(50% 50%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
  }
  // 变长
  27%, 75%{
    clip-path: polygon(50% 50%, 100% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%);
  }
  
  // 旋转动画部分
  55%, 60%{
    -webkit-transform: rotate(415deg);
  }
  85%, 100%{
    -webkit-transform: rotate(685deg);
  }
}
</style>