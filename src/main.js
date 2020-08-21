/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-20 11:06:54
 * @FilePath: \Offcial_exam\src\main.js
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
