<!--
 * @Date         : 2020-05-15 14:17:23
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-15 14:48:09
 * @FilePath     : \kaoshi\src\views\wealth\inviteRecord.vue
 * @Description  : 邀请记录
-->
<style lang="scss" scoped>
main{
  font-size: .3rem;
  .title{
    height: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 .25rem;
    box-sizing: border-box;
    margin-top: .1rem;
  }
  ul.list{
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: .88rem;
      padding: 0 .25rem;

      background: #fff;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #eee;
    }
  }
}
</style>
<template>
  <div>
    <BackBar>邀请记录</BackBar>
    <main>
      <div class="title">
        <div class="cell">用户名</div>
        <div class="cell">时间</div>
        <div class="cell">详情</div>
      </div>
      <ul class="list">
        <li v-for="(item) in list" :key="item.id">
          <div class="cell">{{item.nickname}}</div>
          <div class="cell">{{item.create_time}}</div>
          <div class="cell">{{item.level}}</div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
export default {
  data () {
    return {
      token: '',
      list: []
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token')
    this.getData()
  },
  methods: {
    getData () {
      this.WR.post('/api/v1/invitationRecord', {
        token: this.token
      }).then(rs => {
        if (rs.code === 0) {
          this.list = rs.data
        }
      })
    }
  }
}
</script>
