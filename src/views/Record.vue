<!--
 * @Date         : 2020-05-11 17:07:18
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-22 16:44:20
 * @FilePath     : \kaoshi\src\views\Record.vue
 * @Description  : 考试记录
 -->
 <style lang="scss" scoped>
main{
  margin-top: 1.2rem;
}
  // 居中
   .valueclass{
     margin-top: .2rem;
   }
   .van-icon.van-icon-arrow.van-cell__right-icon{
     margin-top: .2rem;
   }
 </style>
 <style lang="scss">
   .record{
     .fixed{
       position: fixed;
       top: 0;
       left: 0;
       z-index: 1;
     }
   }
 </style>
<template>
  <div class="record">

     <BackBar class="fixed">考试记录</BackBar>
     <main>
       <van-cell-group class="group">
          <van-cell v-for="(item, index) in list" :key="item.number" :title="item.name"  icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/history.png" is-link :value="item.status? item.fraction +' 分': '继续答题'" :label="item.start_time" value-class="valueclass" @click="selectOne(index)"/>
    </van-cell-group>
<!-- <div class="test">
  你好
</div> -->
     </main>

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
      list: [],
      token: ''
    }
  },
  mounted () {
    this.token = window.sessionStorage.token
    this.getData()
  },
  methods: {
    getData () {
      const _this = this
      this.$load.show()
      this.WR.post('/api/v1/examRecord', {
        token: _this.token
      }, this).then((rs) => {
        if (rs.code === 0) {
          _this.list = rs.data
        }
        // console.log(JSON.stringify(rs))
        this.$load.hide()
      })
    },
    // 继续答题或者查看得分详情
    selectOne (index) {
      const status = this.list[index].status
      // 0继续答题，1查看得分
      // console.log(status)
      const number = this.list[index].number
      if (status === 0) {
        this.$router.push({ name: 'Exam', query: { number: number } })
      } else {
        this.$router.push({ name: 'Exam', query: { number: number, seeDetail: true } })
      }
    }
  }
}
</script>
