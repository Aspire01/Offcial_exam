<!--
 * @Date         : 2020-05-12 11:33:30
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 15:42:46
 * @FilePath     : \kaoshi\src\views\wealth\exchange.vue
 * @Description  : 星星/钻石兑换
 -->
 <style lang="scss" scoped>
   header{
     margin:.5rem;
     color: #333;
     font-size: .3rem;
     .mystar{
       margin-bottom: .3rem;
     }
   }
   .orange{
     color: orange;
     font-size: .32rem;
   }
   .red{
     color: rgba(255, 0, 0, 0.733);
     font-size: .32rem;
   }
 </style>
<template>
  <div>
    <BackBar>{{title}}兑换</BackBar>
    <header>
      <div class="mystar">
        <span>我的{{title}}： <span class="orange">{{num}} </span><span>颗</span></span>
      </div>
      <div class="excharge-price">
        <span>兑换价格： <span class="red">{{price}} </span><span>颗 /次</span></span>
      </div>
    </header>
    <van-collapse v-model="active1" accordion>
      <van-collapse-item
        :title="item.name"
        :name="index"
        icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/history.png"
        size="large"
        v-for="(item, index) in list"
        :key="item.id"
      >
        <van-collapse v-model="active2" accordion :border="false">
          <div v-if="!item.child[0].child">
            <!-- 无二级 ,无mid -->
            <!-- 详情进入 -->
            <van-cell :title="item3.name" is-link  :value="item3.num"  v-for="(item3) in item.child" :key="item3.id" @click="confirmExchange(item.id, '',item3.id)"/>
          </div>
          <div v-else>
            <!-- 有二级分类 -->
            <van-collapse-item
              :title="item2.name"
              :name="index2"
              v-for="(item2, index2) in item.child"
              :key="item2.id"
            >
            <van-collapse v-model="active3" accordion :border="false">
              <!-- 详情进入 -->
              <van-cell :title="item3.name" is-link @click="confirmExchange(item.id, item2.id, item3.id)" :value="item3.num"  v-for="(item3) in item2.child" :key="item3.id"/>
            </van-collapse>
            </van-collapse-item>
          </div>

          <!-- <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
          <van-collapse-item title="标题3" name="3" >内容</van-collapse-item>-->
        </van-collapse>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import Vue from 'vue'
import { Collapse, CollapseItem, Dialog } from 'vant'

// 全局注册
Vue.use(Dialog)
Vue.use(Collapse)
Vue.use(CollapseItem)
export default {
  data () {
    return {
      token: '',
      active1: '0',
      active2: '0',
      active3: '0',
      list: [],
      title: '',
      // 1星星 ，2钻石
      type: 1,
      // 颗数
      num: 0,
      // 兑换价格
      price: ''
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')
    console.log(this.$route.query)
    this.type = parseInt(this.$route.query.type)
    if (this.type === 1) {
      this.title = '星星'
    } else if (this.type === 2) {
      this.title = '钻石'
    }
    this.getData()
  },
  methods: {
    getData () {
      this.$load.show()
      let url = '/api/v1/starExchange'
      if (this.type === 2) {
        url = '/api/v1/diamondExchange'
      }
      this.WR.post(url, {
        token: this.token
      }).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          const data = rs.data
          this.list = data.list
          if (this.type === 1) {
            this.num = data.star
          } else {
            this.num = data.diamond
          }
          this.price = data.exchange_price
        }

        this.$load.hide()
      })
    },
    // 弹出框
    confirmExchange (pid, mid, oid) {
      Dialog.confirm({
        title: '确认兑换',
        message: '兑换一次将扣除' + this.price + '个' + this.title + '，是否确认兑换？'
      }).then(() => {
        this.sendExchange(pid, mid, oid)
      })
    },
    sendExchange (pid, mid, oid) {
      let url = ''
      if (this.type === 1) {
        url = '/api/v1/confirmExchangeStars'
      } else if (this.type === 2) {
        url = '/api/v1/confirmExchangeDiamonds'
      }
      console.log(this.token)
      const subject = `${pid},${mid},${oid}`
      console.log(subject)
      this.WR.post(url, {
        token: this.token,
        subject_id: subject
      }).then(rs => {
        if (rs.code === 1) {
          Dialog({ message: rs.message })
        } else if (rs.code === 0) {
          Dialog({ message: rs.message })
          this.getData()
        }
        console.log(rs)
      })
    }
  }
}
</script>
