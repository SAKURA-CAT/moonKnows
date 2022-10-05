<template>
  <view>
    <view class="goods-list">
      <!-- 如果列表存在 -->
      <block v-if="goodsList.length!==0">
        <view v-for="(item, i) in goodsList" :key="i" @click="gotoGoodsDetail(item)">
          <my-goods-list :goods="item"></my-goods-list>
        </view>
      </block>
      <!-- 不存在的话就给个不存在的提示 -->
      <block v-else>
        <view class="goods-not-exists">
          <uni-icons color="#dddddd" type="cart" size="100"></uni-icons>
          <text>Oh,该类别暂时没有商品哦～</text>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        total:0,
        goodsList: [],
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 下拉触底的节流阀，判断是否正在请求数据
        isloading: false
      };
    },
    onLoad(options){
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb){
        this.isloading = true
        const {data: resp} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // console.log(resp)
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        if (resp.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...resp.message.goods]
        this.total = resp.message.total
        this.isloading = false
      },
      gotoGoodsDetail(item){
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
        })
      }
    },
    // 触底的事件
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg({title: "没有更多信息了"})
      if (this.isloading) return
      // 让页码值自增 +1
      this.queryObj.pagenum += 1
      // 重新获取列表数据
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      // 2. 重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
.goods-list{
  .goods-not-exists{
    width: 400rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    text{
      font-size: 30rpx;
      color: #dddddd;
    }
  }
}
</style>
