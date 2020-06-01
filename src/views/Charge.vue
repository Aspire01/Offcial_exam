<!--
 * @Date         : 2020-05-11 15:33:15
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 10:51:45
 * @FilePath     : \kaoshi\src\views\Charge.vue
 * @Description  : 充值次数
 -->

 <style lang="scss" scoped>
  main{
    margin:.8rem;
    font-size: .3rem;
    .title{
      font-size: .32rem;
      margin-bottom: .5rem;
    }
    .charge-num{
      display: flex;
      align-items: center;
      margin: .4rem 0 ;
      .handle{
        display: flex;
        align-items:center;
        span{
          padding: .2rem .28rem;

          background-color: #eee;
        }
        .num{
          width: 1rem;
          text-align: center;
          padding: .2rem .1rem;
          background-color: #eee;
          margin: 0 .1rem;
        }
      }
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
       <div>
     <BackBar>充值次数</BackBar>
     <main>
       <div class="title">{{name}}</div>
       <div class="last"> <span>剩余次数：</span><span>{{num}}</span></div>
       <div class="charge-num">
         <span>充值次数：</span>
         <div class="handle">
           <span @click="dec">-</span>
           <div class="num">{{chargeNum}}</div>
           <span @click="add">+</span>
         </div>
       </div>
       <div class="money">
         <span>充值费用：</span> <span>{{purchase_price}}元/次</span>
       </div>
     </main>
     <footer>
       <div class="cell" @click="sure">确认支付</div>
     </footer>
   </div>
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
      num: 0,
      money: '',
      chargeNum: 1,
      purchase_price: 0.00,
      id: ''
    }
  },
  mounted () {
    const obj = this.$route.query
    this.name = obj.name
    this.num = obj.num
    this.id = obj.id
    this.purchase_price = JSON.parse(window.sessionStorage.getItem('userinfo')).purchase_price
  },
  methods: {
    add () {
      this.chargeNum++
    },
    dec () {
      if (this.chargeNum <= 1) {
        Dialog({ message: '不能再减少了，至少选择1次' })
      } else {
        this.chargeNum--
      }
    },
    sure () {
      const total = this.chargeNum * this.purchase_price
      // console.log('确认支付')
      Dialog.confirm({
        title: '确认支付',
        message: `您购买科目:${this.name}，次数：${this.chargeNum}, 单次费用：${this.purchase_price}元，共${total}元?`
      })
        .then(() => {
          console.log(1)
          const sendid = `${this.id.pid},${this.id.mid},${this.id.oid}`
          // console.log(this.id)
          this.WR.post('/api/v1/purchases', {
            token: window.sessionStorage.getItem('token'),
            subjects: sendid,
            frequency: this.chargeNum
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
