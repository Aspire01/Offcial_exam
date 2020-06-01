<!--
 * @Date         : 2020-05-06 17:42:43
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-09 10:53:55
 * @FilePath     : \kaoshi\src\components\loading\Loading.vue
 * @Description  : 加载中写入原型
 -->
 <style lang="scss">
 .load-status{
  //  position: fixed;
  //  width: 100%;
  //  height: 100%;
  //  top:0;
  //  left: 0;
   .loading{
     position: absolute;
     top:20%;
     left: 50%;
     transform: translateX(-50%);
     margin: 2rem auto;
   }
 }
 </style>
<template>
  <div class="load-status">
    <div class="loading"  v-show="showLoading">
<van-loading type="spinner"/>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import { Loading } from 'vant'

Vue.use(Loading)
export default {
  data () {
    return {

    }
  },
  props: {
    showLoading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>
