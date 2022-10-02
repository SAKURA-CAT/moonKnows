<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image class="nav-img" :src="item.image_src "></image>
      </view>
    </view>
    <!-- 楼层列表区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层的标题 -->
        <image class="floor-title" :src="item.floor_title.image_src "></image>
        <!-- 存放一个楼层的具体内容 -->
        <view class="floor-img-box">
          <!-- 左侧大盒子 -->
          <navigator class="floor-left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" mode="widthFix"></image>
          </navigator>
          <!-- 右侧四个小盒子 -->
          <view class="floor-right-img-box">
            <navigator class="floor-right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script> 
  export default {
    data() {
      return {
        // 轮播图数据列表
        swiperList:[],
        // 分类导航的数据列表
        navList: [],
        // 楼层数据列表
        floorList: []
      };
    },
    onLoad(){
      //获取轮播图数据
      this.getSwiperList()
      // 分类导航的数据 
      this.getNavList()
      // 楼层数据
      this.getFloorList()
    },
    methods:{
      async getSwiperList(){
        const {data: resp} = await uni.$http.get("/api/public/v1/home/swiperdata ")
        console.log("[轮播图数据]", resp)
        if (resp.meta.status !== 200) return uni.$showMsg()
        // uni.$showMsg({
        //   "title": "数据请求成功!",
        //   "icon": "success"
        // })
        this.swiperList = resp.message 
      },
      async getNavList(){
        const {data: resp} = await uni.$http.get("/api/public/v1/home/catitems")
        console.log("[分类导航数据]", resp)
        if (resp.meta.status !== 200) return uni.$showMsg()
        this.navList = resp.message
      },
      async getFloorList(){
        const {data: resp} = await uni.$http.get("/api/public/v1/home/floordata")
        console.log("[楼层列表数据]", resp)
        if (resp.meta.status !== 200) return uni.$showMsg()
        // 双重循环，预先处理数据
        resp.message.forEach(floor =>{
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = resp.message
      },
      navClickHandler(item){
        // 点击分类的话就传到tabbar的分类页面
        if (item.name === '分类') uni.switchTab({
          url:'/pages/cate/cate'
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper{ 
    height: 330rpx;
    
    .swiper-item, image {
      width: 100%;
      height: 100%;
    }
  }
  
  .nav-list{
    display: flex;
    justify-content: space-around;
    margin: 30rpx 0 ;
    
    .nav-img{
      width: 128rpx;
      height: 140rpx;
    }
  }
  .floor-list{
    
    
   .floor-item{
     
     .floor-title{
       width: 100%;
       height: 60rpx;
     }
     
     .floor-img-box{
       display: flex;
       padding-left: 10rpx;
       
       .floor-left-img-box{
         image{
           width: 232rpx;
         }
       }
       .floor-right-img-box{
         display: flex;
         flex-wrap: wrap;
         justify-content: space-around;
         
         .floor-right-img-item{
           
         }
       }
     }
   } 
  }
</style>
