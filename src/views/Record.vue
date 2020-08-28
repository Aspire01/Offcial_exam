<!--
 * @Date         : 2020-05-11 17:07:18
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-28 14:35:08
 * @FilePath: \Offcial_exam\src\views\Record.vue
 * @Description  : 考试记录
 -->
 <style lang="scss" scoped>
main {
  margin-top: 1.2rem;
}
// 居中
.valueclass {
  margin-top: 0.2rem;
}
.van-icon.van-icon-arrow.van-cell__right-icon {
  margin-top: 0.2rem;
}
</style>
 <style lang="scss">
.record {
  .fixed {
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
        <van-cell
          v-for="(item, index) in list"
          :key="item.number"
          :title="item.name"
          icon="http://hukaobang.caimaomeng.com/static/kaoshi/img/history.png"
          is-link
          :value="item.status? item.fraction +' 分': '继续答题'"
          :label="item.start_time"
          value-class="valueclass"
          @click="selectOne(index,item.type)"
        />
      </van-cell-group>
    </main>
  </div>
</template>
<script>
import Vue from "vue";
import { Cell, CellGroup } from "vant";

Vue.use(Cell);
Vue.use(CellGroup);
export default {
  data() {
    return {
      list: [],
      token: "",
    };
  },
  mounted() {
    this.token = window.sessionStorage.token;
    this.getData();
  },
  methods: {
    getData() {
      const _this = this;
      this.$load.show();
      this.WR.post(
        "/api/v1/examRecord",
        {
          token: _this.token,
        },
        this
      ).then((rs) => {
        if (rs.code === 0) {
          _this.list = rs.data;
        }
        // console.log(JSON.stringify(rs))
        this.$load.hide();
      });
    },
    // 继续答题或者查看得分详情
    // _type: 1 习题 2 真题
    // 说明：真题继续考试的话 不需要显示答案解析
    selectOne(index, _type) {
      const status = this.list[index].status;
      // 0继续答题，1查看得分
      // console.log(status)
      const number = this.list[index].number;

      // 继续答题 并且是真题的情况
      if(status === 0 && _type === 2) {
        this.$router.push({ name: "Exam", query: { number: number, realFlag: true } });
        return;
      }

      if (status === 0) {
        this.$router.push({ name: "Exam", query: { number: number } });
      } else {
        this.$router.push({
          name: "Exam",
          query: { number: number, seeDetail: true },
        });
      }
    },
  },
};
</script>
