<!--
 * @Date         : 2020-05-25 16:02:55
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 16:54:22
 * @FilePath     : \kaoshi\src\views\HistoryDetail.vue
 * @Description  : 确认年份（历年真题）
-->
<style lang="scss" scoped>
.van-cell__value{
  flex:  0 1 auto;
  width: 2rem;
}
</style>
<template>
  <div>
    <BackBar>确认年份</BackBar>
    <van-cell-group>

  <van-cell v-for="(item) in list" :key="item.id" :title="item.title" value="开始考试" is-link icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/subject.png" @click="start(item.id)"/>
</van-cell-group>
  </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data () {
    return {
      // name: '',
      id: {
        pid: '',
        mid: '',
        oid: ''
      },
      list: [],
      token: window.sessionStorage.getItem('token')
    }
  },
  mounted () {
    // const list = JSON.parse(this.$route.query.list)
    console.log(this.$route.query)
    this.id.pid = this.$route.query.pid
    this.id.mid = this.$route.query.mid
    this.id.oid = this.$route.query.oid
    this.getData()
  },
  methods: {
    getData () {
      this.$load.show()
      this.WR.get('/api/v1/confirmYear', {
        token: this.token,
        pid: this.id.pid,
        oid: this.id.oid,
        mid: this.id.mid
      }).then(rs => {
        console.log(JSON.stringify(rs))
        this.$load.hide()
        this.list = rs.data
      })
    }, // 开始考试
    start (zhenId) {
      console.log(zhenId)
      this.$router.push({ path: '/exam', query: { id: this.id, zhenId: zhenId } })
    }
  }
}
</script>
