<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" radius="100" cancelButton="none" :value="kw"></uni-search-bar>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-if="searchResults.length===0">
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historyList_" :key="i" @click="searchHistory(item)"></uni-tag>
      </view>
    </view>
    
    <!-- 搜索建议列表 -->
    <view class="search-sugg-list" v-else>
      <view class="search-sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="search-goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        kw:"",
        searchResults:[],
        historyList: [],
        inputTimer:null
      };
    },
    methods:{
      input(e){
        clearTimeout(this.inputTimer)
        if (e.length!==0)
          this.inputTimer = setTimeout(()=>{
            if (this.kw != e){
              this.kw = e
              this.getSearchList()
              console.log(e)
            }
          }, 500)
        else{
          this.kw = e
          this.searchResults=[]
        }
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if (res.meta.status !== 200) return uni.$showMsg()
        // 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
        this.saveSearchHistory()
        this.searchResults = res.message
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      // 保存搜索关键词
      saveSearchHistory() {
        // 关键词去重
        // 1. 将 Array 数组转化为 Set 对象
        const set = new Set(this.historyList)
        // 2. 调用 Set 对象的 delete 方法，移除对应的元素
        set.delete(this.kw)
        // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
        set.add(this.kw)
        // 4. 将 Set 对象转化为 Array 数组
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 重新搜索历史记录
      searchHistory(e){
        // console.log(e)
        this.kw = e
        this.getSearchList()
      },
      cleanHistory(){
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      }
    },
    computed: {
      historyList_() {
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
  }
</script>

<style lang="scss">

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20rpx;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}

.search-sugg-list {
  padding: 0 5px;

  .search-sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

</style>
