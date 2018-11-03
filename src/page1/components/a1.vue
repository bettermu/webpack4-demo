<template>
<div>
  <div class="head">{{head}}</div>
  <ab></ab>
</div>
  
</template>

<script>
import Ab from './a2.vue'
export default {
  data(){
    return{
      head:'我是a页面的子组件'
    }
  },
  components:{
    Ab
  }
}
</script>

<style lang="less" scoped>
  .head {
    background-color:yellow;
  }
</style>



