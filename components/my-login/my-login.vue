<template>
  <view class="login-container">
      <!-- 提示登录的图标 -->
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <!-- 登录按钮 open-type="getUserInfo"表示希望获取用户的基本信息 -->
      <button type="primary" class="btn-login" @tap="getUserProfile">一键登录</button>
      <!-- 登录提示 -->
      <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  export default {
    name:"my-login",
    computed:{
      ...mapState('m_user', ['redirectInfo']),
    },
    data() {
      return {
        
      };
    },
    methods:{
      // 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // 获取微信用户的基本信息
      async getUserProfile() {
        const [err, detail] = await uni.getUserProfile({
          desc: '完善用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，谨慎填写
        })
        console.log([err, detail])
        // 登录授权失败的情况
        if (err){
          switch(err.errMsg){
            case "getUserProfile:fail auth deny":
              return uni.$showMsg({
                title: "您取消了授权",
              })
            default:
              return uni.$showMsg({
                title: "登录出错了QAQ",
              })
          }
        }
        this.updateUserInfo(detail.userInfo)
        // 用户信息获取成功，获取永久token
        this.getToken(detail)
      },
      // 调取登录接口，换取永久token
      async getToken(info){
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log([err, res])
        // 判断是否调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError({
            title: "凭证获取失败!",
          })
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 换取 token
        // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        const token = '123'
        // 判断回传状态
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // 直接登录成功
        uni.$showMsg({
          title: "登录成功",
          icon: "success"
        })
        this.updateToken(token)
        
        // 实现登录后跳转功能
        // 判断 vuex 中的 redirectInfo 是否为 null
        // 如果不为 null，则登录成功之后，需要重新导航到对应的页面
        this.navigateBack()
      },
      navigateBack(){
        // redirectInfo 不为 null，并且导航方式为 switchTab
        if (this.redirectInfo) {
          switch(this.redirectInfo.openType){
            case 'switchTab':
              // 调用小程序提供的 uni.switchTab() API 进行页面的导航
              uni.switchTab({
                // 要导航到的页面地址
                url: this.redirectInfo.from,
                // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
                complete: () => {
                  this.updateRedirectInfo(null)
                }
              })
              break
            default:
              break
          }
        }
      }
    }
  }
</script>

<style lang="scss">
.login-container{
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f8f8f8;
  overflow: hidden;
  // 绘制登录盒子底部的半椭圆造型
  &::after{
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 80rpx;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .btn-login{
    width: 80%;
    border-radius: 200rpx;
    margin: 30rpx 0;
    background-color: #00b65f;
  }
  .tips-text{
    font-size: 24rpx;
    color: gray;
  }
}
</style>