<template>
  <view>
    <block v-if="address_info.info.length">
      
    </block>
    <block v-else>
      哎呀，你还没有地址噢
    </block>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address-list",
    computed:{
      ...mapState('m_user', 'address_info')
    },
    data() {
      return {
        
        
      };
    },
    onReady(){
      console.log(this.address_info)
    }
  }
</script>

<style lang="scss">

</style>