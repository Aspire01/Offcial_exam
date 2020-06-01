<!--
 * @Date         : 2020-05-25 15:49:15
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-25 16:24:20
 * @FilePath     : \kaoshi\src\views\History.vue
 * @Description  : 历年真题
-->
<template>
  <div>
    <BackBar>历年真题</BackBar>
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
            <van-cell :title="item3.name" is-link :to="{path: 'historydetail',query:{pid: item.id, oid: item3.id}}" v-for="(item3) in item.child" :key="item3.id"/>
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
              <van-cell :title="item3.name" is-link :to="{path: 'historydetail',query:{pid: item.id, mid: item2.id, oid: item3.id}}" v-for="(item3) in item2.child" :key="item3.id"/>
            </van-collapse>
            </van-collapse-item>
          </div>
        </van-collapse>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant'

Vue.use(Collapse)
Vue.use(CollapseItem)
export default {
  data () {
    return {
      active1: '0',
      active2: '0',
      active3: '0',
      list: [],
      token: window.sessionStorage.getItem('token')
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$load.show()
      this.WR.get('/api/v1/perYearExamQuestion', {
        token: this.token
      }).then(rs => {
        console.log(JSON.stringify(rs))
        this.$load.hide()
        this.list = rs.data
      })
    }
  }
}
</script>
