import { mapGetters } from 'vuex'

// 导出一个 mixin 对象
export default {
  data(){
    return {
      cart_index: 2
    }
  },
  computed: {
    ...mapGetters('m_cart', ['total']),
  },
  watch: {
    total(newVal){
      this.setCartBadge()
    }
  },
  onShow() {
    // 在页面刚展示的时候，设置数字徽标
    this.setCartBadge()
  },
  methods: {
    setCartBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      if (this.total) uni.setTabBarBadge({
        index: this.cart_index,
        text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
      })
      else uni.hideTabBarRedDot({
        index:this.cart_index
      })
    },
  },
}