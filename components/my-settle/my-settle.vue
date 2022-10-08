<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <block v-if="checkedCount">
      <!-- 合计 -->
      <view class="amount-box">
        合计: <text class="amount">¥{{checkedGoodsAmount}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
    </block>
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      // addstr 是详细的收货地址，当用户没选择收货地址时，addstr为空字符串''
      ...mapGetters('m_user', ['addstr']),
      // token 是用户登录成功之后的 token 字符串
      ...mapState('m_user', ['token']),
      // 是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      },
    },
    name:"my-settle",
    data() {
      return {
        // 倒计时的秒数
        seconds: 3,
        timer: null
      };
    },
    methods:{
      ...mapMutations('m_user', ['updateRedirectInfo']),
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      // label 的点击事件处理函数
      changeAllState() {
        // 修改购物车中所有商品的选中状态
        // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 结算支付按钮
      settlement(){
        // 不用判断用户是否勾选了商品，当用户没有选商品时，没有结算的按钮
        // 首先判断用户是否选择了收货地址
        if (!this.addstr) return uni.$showMsg({title: "请选择收货地址!"})
        if (!this.token) return this.delayNavigate()
      },
      // 展示倒计时的提示消息
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      },
      // 延迟导航到 my 页面
      delayNavigate() {
        let seconds = this.seconds
        // 1. 展示提示消息，此时 seconds 的值等于 3
        this.showTips(seconds)
        // 2. 创建定时器，每隔 1 秒执行一次
        this.timer = setInterval(() => {
          // 2.1 先让秒数自减 1
          seconds--
          // 2. 判断秒数是否 <= 0
          if (seconds <= 0) {
            // 2.1 清除定时器
            clearInterval(this.timer)

            // 2.2 跳转到 my 页面
            uni.switchTab({
              url: '/pages/mine/mine',
              // 页面跳转成功之后的回调函数
              success: () => {
                // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                this.updateRedirectInfo({
                  // 跳转的方式
                  openType: 'switchTab',
                  // 从哪个页面跳转过去的
                  from: '/pages/cart/cart'
                })
              }
            })
            // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
            return
          }
          // 2.2 再根据最新的秒数，进行消息提示
          this.showTips(seconds)
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container{
  // 底部固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  // 设置宽和高
  width: 100%;
  height: 100rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  padding-left: 20rpx;
  .radio{
    display: flex;
    align-items: center; 
    radio{
      margin-right: 10rpx;
    }
  }
  .amount-box{
    
    .amount{
      color: #C00000;
      font-weight: bold;
    }
  }
  .btn-settle{
    background-color: #C00000;
    height: 100%;
    width: 33.3%;
    min-width: 200rpx;
    color: white;
    line-height: 100rpx;
    padding: 0 20rpx;
    text-align: center;
  }
}
</style>