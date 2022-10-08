<template>
  <view class="mine-container">
    <my-login v-if="!token"></my-login>
    <my-user-info v-else></my-user-info>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    computed: {
      // 2. 从 m_user 模块中导入需要的 token 字符串
      ...mapState('m_user', ['token']),
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  page,
  .mine-container{
    height: 100%;
  }
</style>
