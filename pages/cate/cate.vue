<template>
  <!-- 使用自定义的搜索组件 -->
  <view>
    <my-search @click="gotoSearch()"></my-search>
    <view class="cate-scroll-container">
      <!-- 左侧的滑动区域 -->
      <scroll-view class="cate-left-scroll" scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateListLevel1" :key="i">
          <view :class="['cate-left-scroll-item', i === active? 'active': '']" @click="activeChange(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧的滑动区域 -->
      <scroll-view class="cate-right-scroll" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-right-v2" v-for="(item2, i2) in cateListLevel2" :key="i2">
          <!-- 二级标题 -->
          <block v-if="item2.children">
            <view class="cate-right-v2-title">/  {{item2.cat_name}}  /</view>
            <!-- 三级元素 -->
            <view class="cate-right-v3-list">
              <view class="cate-right-v3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3.cat_id)">
                <!-- 图片 -->
                <image :src="item3.cat_icon.replace('dev', 'web')"></image>
                <!-- 文本 -->
                <text>{{item3.cat_name}}</text>
              </view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        // 当前设备可用的高度
        wh:0,
        // 一级分类
        cateListLevel1:[],
        // 二级分类
        cateListLevel2:[],
        active: 0,
        scrollTop: 0
      };
    },
    onLoad(){
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      console.log(sysInfo)
      this.getCateList()
    },
    methods:{
      // 获取分类列表的数据
      async getCateList(){
        const {data: resp} = await uni.$http.get('/api/public/v1/categories')
        if (resp.meta.status !== 200) return uni.$showMsg()
        this.cateListLevel1 = resp.message
        // 默认索引为0
        this.cateListLevel2 = resp.message[0].children
      },
      activeChange(index){
        this.active = index
        this.cateListLevel2 = this.cateListLevel1[index].children
        this.scrollTop = this.scrollTop == 0? -1:0
      },
      gotoGoodsList(cat_id){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + cat_id
        })
      },
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .cate-scroll-container{
    display: flex;
    
    .cate-left-scroll{
      width: 30%;
      
      
      .cate-left-scroll-item{
        background-color: #f7f7f7;
        line-height: 120rpx;
        text-align: center;
        font-size: 24rpx;
        position: relative;
        
        &.active{
          background-color: #ffffff;
          &::before{
            content: " ";
            display: block;
            width: 6rpx;
            height: 60rpx ;
            background-color: #00b65f;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
    .cate-right-scroll{
      
      
      .cate-right-v2{
        
        
        .cate-right-v2-title{
          font-size: 24rpx;
          font-weight: bold;
          text-align: center;
          padding: 30rpx 0;
        }
        .cate-right-v3-list{
          display: flex;
          flex-wrap: wrap;
          .cate-right-v3-item{
            width: 33.33%;
            display: flex;
            flex-direction:  column;
            justify-content: center; 
            align-items: center;
            margin-bottom: 20rpx;
            image{
              width: 120rpx;
              height: 120rpx;
            }
            text{
              font-size: 24rpx;
            }
          }
        }
      }
    }
  }
</style>
