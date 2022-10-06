export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商 品的信息对象
    // 我们约定每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  // 模块的 mutations 方法
  mutations: {
    addToCart(state, goods){
      // 根据提交的商品id，查询购物车中是否存在这件商品
      // 如果不存在，则findResult应该为undefined，否则，直接查找到商品的信息对象
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      
      if (!findResult) state.cart.push(goods)
      else findResult.goods_count ++
     // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
     this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
    
      // 有对应的商品信息对象
      if (findResult) {
        // 更新对应商品的勾选状态
        findResult.goods_state = goods.goods_state
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车中的商品数量
    updateGoodsCount(state, goods){
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if(findResult) {
        // 更新对应商品的数量
        findResult.goods_count = goods.goods_count
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    }
  },

  // 模块的 getters 属性
  getters: {
    total(state){
      let c = 0
      // 循环统计商品的数量，累加到c之中
      state.cart.forEach((goods)=>{
        c ++
      })
      return c
    }
  },
}

