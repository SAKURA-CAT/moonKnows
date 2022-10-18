export default{
  namespaced: true,
  
  // 数据节点
  state: ()=>({

    // 所有地址
    // 一个地址应该包含以下信息：provinceName、cityName、countyName、detailInfo、telNumber、userName，defaultSelected
    // 上述为info，还有其他的信息，当前选择index等...
    // address_info: JSON.parse(uni.getStorageSync('address_info') || '{"selected": 0, "info": []}'),
    address_info: {"selected": 0, "info": [{"provinceName": "陕西省", "cityName": "西安市", "countyName": "长安区", "detailInfo": "西安电子科技大学南校区", "telNumber": "19829363248", "userName": "李抗", "defaultSelected": true}]},
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
      console.log("保存address_info...")
      uni.setStorageSync('address_info', JSON.stringify(state.address_info))
    },
    // 更新默认的收货地址，传入index
    updateAddress(state, index){
      state.address_info.info.forEach((address, index_)=>{
        address["defaultSelected"] = index === index_
      })
      this.commit("m_user/saveAddressToStorage")
    },
    // 删除某一个收货地址
    clearAddress(state, index){
      state.address_info.info.splice(index, 1)
      // 如果删除的地址为默认选择的地址，则将删除后的第一个地址变为默认选择的地址
      if (index == state.address_info.selected){
        // 如果删除了以后就没有了，就置-1
        state.address_info.selected = state.address_info.info.length? 0:-1
        if (state.address_info.info.length) state.address_info.info[0].default = true
      }
      else if(index <= state.address_info.selected) state.address_info.selected--
        // 被删除的元素在默认选择的index之前，则需要将selected-1
      this.commit("m_user/saveAddressToStorage")
    },
    // 新增收获地址
    addAddress(state, address){
      // 添加收获地址，且不默认选择
      address["defaultSelected"] = false
      state.address_all.info.push(address)
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
      if(state.address_info.selected > -1){
        let address = state.address_info.info[state.address_info.selected]
        return address.provinceName + address.cityName + address.countyName + address.detailInfo
      }
      return ''
    },
    address(state){
      if(state.address_info.selected > -1){
        return state.address_info.info[state.address_info.selected]
      }
      return {}
    }
  }
}