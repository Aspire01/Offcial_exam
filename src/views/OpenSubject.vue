<!--
 * @Date         : 2020-05-25 17:44:57
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 10:51:53
 * @FilePath     : \kaoshi\src\views\OpenSubject.vue
 * @Description  : 开通科目
-->
<style lang="scss" scoped>
 main{
    margin:.8rem;
    font-size: .3rem;
    .title,.level,.fee{
      font-size: .32rem;
      margin-bottom: .5rem;
    }
 }
  footer{
    position: fixed;
    width: 100%;
    bottom: 1rem;
    left: 0;
    height: .8rem;
    font-size: .32rem;
    .cell{
      height: 100%;
      margin: 0 auto;
      line-height: .8rem;
      text-align: center;
      background: #eee;
      width: 2.5rem;
      border-radius: .1rem;
    }
  }
</style>
<template>
  <div>
    <BackBar>开通科目</BackBar>
    <main>
      <div class="title">科目名称：{{name}}</div>
      <div class="level">会员等级：{{level}}</div>
      <div class="fee">开通费用： ￥{{price}}</div>
    </main>
         <footer>
       <div class="cell" @click="open">开通科目</div>
     </footer>
  </div>
</template>
<script>
import Vue from 'vue'
import { Dialog } from 'vant'

// 全局注册
Vue.use(Dialog)
export default {
  data () {
    return {
      name: '',
      level: '',
      pid: '',
      price: ''
    }
  },
  mounted () {
    const query = this.$route.query
    this.name = query.name
    this.pid = query.pid
    console.log(query)
    const user = JSON.parse(window.sessionStorage.getItem('userinfo'))
    console.log(user)
    const levelV = user.level
    this.price = user.purchase_account_price
    switch (levelV) {
      case 0:
        this.level = '试用'
        break

      case 1:
        this.level = '普通会员'
        break
      case 2:
        this.level = '高级会员'
        break
    }
  },
  methods: {
    open () {
      Dialog.confirm({
        title: '确认开通',
        message: `您确定开通科目：${this.name}, 费用：￥${this.price}?`
      })
        .then(() => {
          this.WR.post('/api/v1/openAccount', {
            token: window.sessionStorage.getItem('token'),
            subjects: this.pid
          })
            .then(rs => {
              alert(rs)
            })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>
