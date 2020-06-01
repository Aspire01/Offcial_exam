/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-12 11:53:37
 * @FilePath     : \kaoshi\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from '@/components/loading/index.js'

// 全局引用公共函数
import WR from './assets/js/wr.js'
// 全局引入公共组件
import BackBar from '@/components/BackBar.vue'

// 全局引入rem
import './assets/js/rem.js'

Vue.component('BackBar', BackBar)

Vue.use(Loading)
Vue.prototype.WR = WR

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
