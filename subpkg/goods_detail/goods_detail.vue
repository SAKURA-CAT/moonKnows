<template>
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="goods-price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="goods-favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="goods-freight">快递：免运费</view>
    </view>
    <!-- 商品详情信息 -->
    <view style="width:100%;overflow-x:hidden;">
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    </view>
    <!-- 商品的导航组件 -->
    <view class="goods-nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 商品详情的信息对象
        goods_info:{},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(options){
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods:{
      async getGoodsDetail(goods_id){
        const {data: resp} = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
        if (resp.meta.status !== 200) return uni.$showMsg()
        
        // 处理富文本消息
        // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
        resp.message.goods_introduce = resp.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        
        // 获取到最终的信息
        this.goods_info = resp.message
      },
      // 实现轮播图的预览效果
      preview(i) {
        // 调用 uni.previewImage() 方法预览图片
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current: i,
          // 所有图片 url 地址的数组
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      // 左侧的按钮点击事件，传入的参数会告诉我们点击的是哪个icon
      onClick(e) {
        console.log(e)
        // 根据e.content.text 的值，来决定进一步的操作
        // 切换到购物车页面
        if (e.content.text === '购物车') uni.switchTab({url: '/pages/cart/cart'})
        
      }
    }
  }
</script>

<style lang="scss">
.goods-detail-container{
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  // 设置为50px的原因是导航栏本身高为50px
  padding-bottom: 50px
}

swiper{
  height: 750rpx;
  
  image{
    width: 100%;
    height: 100%;
  }
}

.goods-info-box{
  padding: 20rpx 20rpx;
  padding-right: 0;
  .goods-price{
    color: #c00000;
    font-size: 36rpx;
    margin: 20rpx 0;
  }
  
  .goods-info-body{
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 26rpx;
      padding-right: 20rpx;
    }
    // 收藏区域
    .goods-favi {
      width: 240rpx;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  // 运费
  .goods-freight {
    margin: 20rpx 0;
    font-size: 24rpx;
    color: gray;
  }
}

// 底部导航栏
.goods-nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}


</style>
