export default{
  namespaced: true,
  
  // 数据节点
  state: ()=>({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 登录成功后的token
    token: uni.getStorageSync('token') || '',
    // 用户的基本信息
    userinfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 重定向的 object 对象 { openType, from }
    redirectInfo: null
  }),
  
  mutations:{
    // 保存收货地址
    saveAddressToStorage(state){
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 更新收货地址
    updateAddress(state, address){
      state.address = address
      this.commit("m_user/saveAddressToStorage")
    },
    // 清除收货地址
    clearAddress(state, address){
      state.address = {}
      this.commit("m_user/saveAddressToStorage")
    },
    // 更新 token 字符串
    updateToken(state, token) {
      state.token = token
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
      this.commit('m_user/saveTokenToStorage')
    },
    // 将 token 字符串持久化存储到本地
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新用户的基本信息
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
      this.commit('m_user/saveUserInfoToStorage')
    },
  
    // 将 userinfo 持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userinfo))
    },
    // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },
  
  getters:{
    // 获取收货地址
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}