/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-24 10:13:28
 * @FilePath: \Offcial_exam\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Center from '../views/Center.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue')
  },
  {
    // 个人中心
    path: '/',
    name: 'Center',
    component: () => import('../views/Center.vue')
  },
  {
    // 我的科目
    path: '/subject',
    name: 'Subject',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Subject.vue'),
    children: [{
      path: '/about/car',
      name: 'Car',
      component: () => import( /* webpackChunkName: "about" */ '../views/Car.vue')
    }]
  },
  {
    // 确认科目
    path: '/suresubject',
    name: 'SureSubject',
    component: () => import('../views/SureSubject.vue')
  },
  {
    // 开始考试
    path: '/exam',
    name: 'Exam',
    component: () => import('../views/Exam.vue')
  },
  {
    // 充值次数
    path: '/charge',
    name: 'Charge',
    component: () => import('../views/Charge.vue')
  },
  {
    // 考试记录
    path: '/record',
    name: 'Record',
    component: () => import('../views/Record.vue')
  },
  {
    // 奖励细则
    path: '/rule',
    name: 'Rule',
    component: () => import('../views/Rule.vue')
  },
  {
    // 我的财富
    path: '/wealth',
    name: 'Wealth',
    component: () => import('../views/Wealth.vue')
  },
  {
    // 我的财富--星星/钻石兑换
    path: '/wealth/exchange',
    name: 'Exchange',
    component: () => import('../views/wealth/exchange.vue')
  },
  {
    // 我的财富-- 申请提现
    path: '/wealth/get',
    name: 'Get',
    component: () => import('../views/wealth/get.vue')
  },
  {
    // 我的财富-- 邀请记录
    path: '/wealth/record',
    name: 'InviteRecord',
    component: () => import('../views/wealth/inviteRecord.vue')
  },
  {
    // 历年真题
    path: '/history',
    name: 'Histroy',
    component: () => import('../views/History.vue')
  },
  {
    // 历年真题--确认年份
    path: '/historydetail',
    name: 'HistoryDetail',
    component: () => import('../views/HistoryDetail.vue')
  },
  {
    // 开通科目
    path: '/opensubject',
    name: 'OpenSubject',
    component: () => import('../views/OpenSubject.vue')
  }
]

const router = new VueRouter({
  routes
})


// 检测如果是未登录状态不跳转首页
router.beforeEach((to, from, next) => {
  // 测试token时 注释下面2行数据
  // const token = '08d9OUWt+LXxjQyhrok64bwY6Je/7uSYUokM0E1wug'  // 测试token
  // window.sessionStorage.setItem('token', token) 
  const token = window.sessionStorage.getItem("token");
  if (token) {
    next()
  } else {
    if (to.path === '/auth') { //这就是跳出循环的关键
      next()
    } else {
      next('/auth')
    }
  }
})

export default router
