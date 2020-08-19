<!--
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-18 18:24:41
 * @FilePath: \Offcial_exam\src\views\Center.vue
 -->
 <style lang="scss" scoped>
  //  个人中心
  header{
    height: 2.8rem;
    background-image: url("http://hukaobang.caimaomeng.com/static/kaoshi/img/top-bg.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .25rem;
    box-sizing: border-box;
    img.pic{
      width: 1.2rem;
      height: 1.2rem;
      background-color: #fff;
      border-radius: 50%;
      object-fit: cover;
    }

      img.level{
        width: 1.68rem;
        height: .48rem;
      }
  }
  .banner{
    background: #fff;
    font-size: 0;
    img{
      width: 7.02rem;
      height: 1.52rem;
      padding: .25rem;

    }
  }
 </style>
<template>
  <div class="center">
    <header>
      <img :src="avatar" alt="" class="pic">

       <img class="level" v-if="level==1" src="../assets/img/l1.png" alt="">
        <img class="level" v-else-if="level==2" src="../assets/img/l2.png" alt="">
    </header>
    <div class="banner">
      <img src="http://hukaobang.caimaomeng.com/static/kaoshi/img/invitation.png" @click="goInvite()" />
    </div>
    <van-cell-group>
      <van-cell title="我的科目" icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/subject.png" is-link to="subject" />
      <van-cell title="新增考试" icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/add.png" is-link to="subject" />
      <van-cell title="历年真题" icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/history.png" is-link to="history" />
      <van-cell title="考试记录" icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/-record.png" is-link to="record" />
      <van-cell title="我的财富" icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/ware.png" is-link to="wealth" />
      <van-cell title="奖励细则" icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/rule.png" is-link to="rule" />
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import { Cell, CellGroup, Icon } from 'vant'

Vue.use(Icon)

Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      code: '',
      token: '',
      avatar: '',
      level: ''
    }
  },
  mounted () {
    // 取得code 以和后端换取token
    // 开发阶段用固定token
    // const token = 'fabcPfEYaR1kSq60JtkemdNQfqWq+Iu9iFfWPLLT'
    // this.token = token
    // window.sessionStorage.setItem('token', token)
    // getToken后获取个人信息
    this.token = window.sessionStorage.getItem('token')
    this.personalCenter()
    // 开发阶段完毕
  },
  methods: {
    personalCenter () {
      const _this = this
      this.$load.show()
      this.WR.post('/api/v1/personalCenter', {
        token: _this.token
      }).then((rs) => {
        if (rs.code === 0) {
          _this.avatar = rs.data.avatar
          _this.level = rs.data.level
          // 个人信息存
          window.sessionStorage.setItem('userinfo', JSON.stringify(rs.data))
        }
        console.log(JSON.stringify(rs))
        this.$load.hide()
      })
    },
    goInvite () {
      window.location.href = `${this.WR.base_url}/api/v1/inviteFriends`
    }
  },
  components: {
    // HelloWorld
  }
}
</script>
