<!--
 * @Date         : 2020-05-12 14:02:59
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 15:21:24
 * @FilePath     : \kaoshi\src\views\wealth\get.vue
 * @Description  : 申请提现
 -->
 <style lang="scss" scoped>
.get {
  background-color: #f7f7f7;
}
main {
  margin: 0.24rem;
  background-color: #fff;
  border-radius: 0.25rem;
  .cell {
    height: 0.88rem;
    border-bottom: 1px solid #eee;
    width: 100%;
    padding: 0 0.24rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left,
    .right {
      width: 40%;
    }
    .diamond {
      color: purple;
    }
    .ruby {
      color: red;
    }
  }
}
.btn{
  margin: .8rem auto;
  width: 2.8rem;
  height: .88rem;
  color:#fff;
  background: rgb(59, 216, 228);
  line-height: .88rem;
  border-radius: .5rem;
  text-align: center;
  text-align: center;
  font-size: .3rem;
  letter-spacing: 2px;
}
.desc{
  margin: 0 auto;
  width: 5.5rem;
  @include font(.29rem, #888);
}
.code{
  @include square(3rem);
  margin:1rem auto;
  img{
    @include square(100%);
  }
}
</style>
 <template>
  <div class="get">
    <BackBar>申请提现</BackBar>
    <main>
      <div class="cell">
        <div class="left">
          现有钻石：
          <span class="diamond">{{info.diamond}}</span>
        </div>
        <div class="right">
          现有红宝石：
          <span class="ruby">{{info.ruby}}</span>
        </div>
      </div>
      <div class="cell">
        <div class="left">提现钻石：</div>
        <div class="right">
          <input type="number" placeholder="请输入提现数量" v-model="getDiamond"/>
        </div>
      </div>
      <div class="cell">
        <div class="left">提现红宝石：</div>
        <div class="right">
          <input type="number" placeholder="请输入提现数量" v-model="getRuby"/>
        </div>
      </div>
    </main>
    <div class="btn" @click="comfimGet">确认提现</div>
    <div
      class="desc"
    >发起提现申请后，扫码下方二维码，添加客服微信，提现审核通过后，联系客服领取！（目前每颗钻石价值{{info.diamond_price}}元钱，每颗红宝石价值{{info.ruby_price}}元钱。）</div>
    <div class="code">
      <img :src="info.qrcode" alt />
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
      token: '',
      info: {
        diamond: '3',
        ruby: '3',
        qrcode: ''
        // diamond_price: "",
        // ruby_price: ""
      },
      getDiamond: '',
      getRuby: ''
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/api/v1/withdraw', {
        token: this.token
      })
        .then((rs) => {
          if (rs.code === 0) {
            this.info = rs.data
          }
          console.log(rs)
        })
    },
    comfimGet () {
      this.WR.post('/api/v1/confirmWithdrawal', {
        token: this.token,
        ruby: this.getRuby,
        diamond: this.getDiamond
      })
        .then((rs) => {
          if (rs.code === 0) {
            Dialog.alert({
              message: rs.message
            }).then(() => {
              window.history.go(-1)
            })
          }
          console.log(rs)
        })
    }
  }
}
</script>
