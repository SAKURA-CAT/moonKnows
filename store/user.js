export default{
  namespaced: true,
  
  // 数据节点
  state: ()=>({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
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
  },
  
  getters:{
    // 获取收货地址
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}