<!--
 * @Date         : 2020-05-06 14:51:46
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-29 16:20:43
 * @FilePath     : \kaoshi\src\views\Subject.vue
 * @Description  : 我的科目subject
 -->
<template>
  <div>
    <BackBar>我的科目</BackBar>
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
            <!-- <van-cell :title="item3.name" is-link :to="{path: 'suresubject',query:{pindex: index, oindex: index3, list: JSON.stringify(list)}}" :value="item3.num"  v-for="(item3, index3) in item.child" :key="item3.id"/> -->
            <van-cell :title="item3.name" is-link @click="linkTo(index, '', index3, list, item3.num)" :value="item3.num"  v-for="(item3, index3) in item.child" :key="item3.id"/>
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
              <!-- <van-cell :title="item3.name" is-link :to="{path: 'suresubject',query:{pindex: index, mindex: index2, oindex: index3, list: JSON.stringify(list)}}" :value="item3.num"  v-for="(item3, index3) in item2.child" :key="item3.id"/> -->
              <van-cell :title="item3.name" is-link @click="linkTo(index, index2, index3, list, item3.num)" :value="item3.num"  v-for="(item3, index3) in item2.child" :key="item3.id"/>
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
      list: [
        // {
        //   id: 1,
        //   name: '护士',
        //   child: [
        //     { id: 1, name: '基础知识', num: '39次' },
        //     { id: 2, name: '专业知识', num: '50次' },
        //     { id: 3, name: '相关专业知识', num: '50次' },
        //     { id: 4, name: '专业实践能力', num: '50次' }
        //   ]
        // },
        // {
        //   id: 2,
        //   name: '护师',
        //   child: [
        //     { id: 1, name: '基础知识', num: '未开通' },
        //     { id: 2, name: '专业知识', num: '未开通' },
        //     { id: 3, name: '相关专业知识', num: '未开通' },
        //     { id: 4, name: '专业实践能力', num: '未开通' }
        //   ]
        // },
        // {
        //   id: 3,
        //   name: '主管护师',
        //   child: [
        //     {
        //       id: 1,
        //       name: '护理学',
        //       child: [
        //         { id: 1, name: '基础知识', num: '未开通' },
        //         { id: 2, name: '专业知识', num: '未开通' },
        //         { id: 3, name: '相关专业知识', num: '未开通' },
        //         { id: 4, name: '专业实践能力', num: '未开通' }
        //       ]
        //     },
        //     {
        //       id: 2,
        //       name: '内科护理学',
        //       child: [
        //         { id: 1, name: '基础知识', num: '未开通' },
        //         { id: 2, name: '专业知识', num: '未开通' },
        //         { id: 3, name: '相关专业知识', num: '未开通' },
        //         { id: 4, name: '专业实践能力', num: '未开通' }
        //       ]
        //     },
        //     {
        //       id: 3,
        //       name: '外科护理学',
        //       child: [
        //         { id: 1, name: '基础知识', num: '未开通' },
        //         { id: 2, name: '专业知识', num: '未开通' },
        //         { id: 3, name: '相关专业知识', num: '未开通' },
        //         { id: 4, name: '专业实践能力', num: '未开通' }
        //       ]
        //     },
        //     {
        //       id: 4,
        //       name: '妇产科护理学',
        //       child: [
        //         { id: 1, name: '基础知识', num: '未开通' },
        //         { id: 2, name: '专业知识', num: '未开通' },
        //         { id: 3, name: '相关专业知识', num: '未开通' },
        //         { id: 4, name: '专业实践能力', num: '未开通' }
        //       ]
        //     },
        //     {
        //       id: 5,
        //       name: '儿科护理学',
        //       child: [
        //         { id: 1, name: '基础知识', num: '未开通' },
        //         { id: 2, name: '专业知识', num: '未开通' },
        //         { id: 3, name: '相关专业知识', num: '未开通' },
        //         { id: 4, name: '专业实践能力', num: '未开通' }
        //       ]
        //     },
        //     {
        //       id: 6,
        //       name: '社区护理学',
        //       child: [
        //         { id: 1, name: '基础知识', num: '未开通' },
        //         { id: 2, name: '专业知识', num: '未开通' },
        //         { id: 3, name: '相关专业知识', num: '未开通' },
        //         { id: 4, name: '专业实践能力', num: '未开通' }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   id: 4,
        //   name: '副主任护师',
        //   child: [
        //     { id: 1, name: '基础知识', num: '未开通' },
        //     { id: 2, name: '专业知识', num: '未开通' },
        //     { id: 3, name: '相关专业知识', num: '未开通' },
        //     { id: 4, name: '专业实践能力', num: '未开通' }
        //   ]
        // }
      ],

      token: window.sessionStorage.getItem('token')
    }
  },
  mounted () {
    // console.log(this.token)
    this.getData()
  },
  methods: {
    getData () {
      const _this = this
      this.$load.show()
      this.WR.get('/api/v1/mySubject', {
        token: _this.token
      }).then(rs => {
        // console.log(JSON.stringify(rs))
        this.$load.hide()
        this.list = rs.data
      })
    },
    linkTo (index, index2, index3, list, num) {
      if (num === '未开通') {
        const name = list[index].name
        const pid = list[index].id
        this.$router.push({ name: 'OpenSubject', query: { pid: pid, name: name } })
        return
      }
      this.$router.push({ name: 'SureSubject', query: { pindex: index, mindex: index2, oindex: index3, list: JSON.stringify(list) } })
    }
  }

}
</script>
