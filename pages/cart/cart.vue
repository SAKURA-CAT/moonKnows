<template>
  <view>
    <!-- 地址区域 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <block v-if="cart.length">
      <view class="cart-container">
        <uni-swipe-action>
          <block v-for="(goods, i) in cart" :key="i">
            <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
            <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
              <my-goods-list :goods="goods" :show-radio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods-list>
            </uni-swipe-action-item>
          </block>
        </uni-swipe-action>
      </view>
      <!-- 结算区域 -->
      <my-settle></my-settle>
    </block>
    <block v-else>
      <empty-cart tips="Oh,你的购物车是空的~"></empty-cart>
    </block>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  // 按需导入 mapState 这个辅助函数
  import { mapState, mapMutations } from 'vuex'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    computed:{
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart']),
    },
    data() {
      return {
        options: [{
          text:"删除",
          style: {
            backgroundColor: '#C00000'
          }
        }]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 商品的勾选状态发生了变化
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      // 商品的数量发生了变化
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 滑动操作按钮
      swipeActionClickHandler(goods){
        this.removeGoodsById(goods.goods_id)
        // console.log(goods.goods_name)
      }
    }
  }
</script>

<style lang="scss">

.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}

.cart-container{
  padding-bottom: 100rpx;
}
</style>
