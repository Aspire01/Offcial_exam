<!--
 * @Date         : 2020-05-13 14:36:44
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-28 14:38:08
 * @FilePath: \Offcial_exam\src\views\Exam.vue
 * @Description  : 开始考试
 -->
 <style lang="scss">
.warp-ing {
  font-size: 0.2rem;
  margin: 0.5rem;
  .title-desc {
    font-size: 0.28rem;
  }
  .title-content {
    margin: 0.2rem 0 0.4rem 0;
    font-size: 0.3rem;
    line-height: 0.5rem;
    color: #333;
  }
  .selects {
    font-size: 0.28rem;
    .select {
      .van-checkbox {
        margin-bottom: 0.2rem;
      }
    }
  }
  .footer {
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    bottom: 1rem;
    left: 0;
    height: 0.9rem;
    .btn {
      width: 2.5rem;
      height: 100%;
      text-align: center;
      background-color: #ddd;
      line-height: 0.9rem;
      font-size: 0.3rem;
      border-radius: 0.05rem;
    }
  }
}
.warp-panel {
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: 0.3rem;
  .panel {
    .title {
      font-size: 0.32rem;
    }
    .desc {
      margin: 0.4rem 0;
      font-size: 0.32rem;
    }
    ul.handlelist {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 0.6rem;
        height: 0.6rem;
        border: 1px solid #ddd;
        background-color: #eee;
        margin-right: 0.33rem;
        margin-bottom: 0.25rem;
        text-align: center;
        line-height: 0.6rem;
        &:nth-of-type(7n) {
          margin-right: 0;
        }
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0.5rem;
    width: 100%;
    height: 0.9rem;
    .cel {
      transform: translateX(-0.3rem);
      width: 2.5rem;
      height: 0.9rem;
      margin: 0 auto;
      line-height: 0.9rem;
      text-align: center;
      background-color: #ddd;
      font-size: 0.3rem;
      border-radius: 0.05rem;
    }
  }
  .timu {
    ul.handlelist li.wrong {
      background: rgba(255, 0, 0, 0.788) !important;
      color: #fff;
    }
    ul.handlelist li.right {
      background: rgb(92, 201, 71);
      color: #fff;
    }
  }
}
.correct {
  font-size: 0.3rem;
  .correct-title {
    margin-bottom: 0.15rem;
    margin-top: 0.5rem;
  }
  .red {
    color: rgba(255, 0, 0, 0.788);
  }
  .green {
    color: green;
  }
}
.look-detail {
  margin-bottom: 0.25rem;
}
</style>
<template>
  <div>
    <BackBar>{{backtitle}}</BackBar>

    <div class="warp-ing" v-show="ifIng">
      <section class="ing">
        <div class="title-desc">
          第{{nowIndex + 1}}题
          （
          <span>{{list[nowIndex]['type']==3? '多选': '单选'}}</span>）：
        </div>
        <div class="title-content">{{list[nowIndex].title}}</div>
        <div class="selects">
          <div class="select">
            <van-checkbox-group
              v-model="answerlist[nowIndex]"
              :max="list[nowIndex]['type']==3? 0: 1"
            >
              <van-checkbox name="a" @click="handleShow(nowIndex,'A')">A. {{list[nowIndex].a}}</van-checkbox>
              <van-checkbox name="b" @click="handleShow(nowIndex,'B')">B. {{list[nowIndex].b}}</van-checkbox>
              <van-checkbox name="c" @click="handleShow(nowIndex,'C')">C. {{list[nowIndex].c}}</van-checkbox>
              <van-checkbox name="d" @click="handleShow(nowIndex,'D')">D. {{list[nowIndex].d}}</van-checkbox>
              <van-checkbox name="e" @click="handleShow(nowIndex,'E')">E. {{list[nowIndex].e}}</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
      </section>

      <div class="correct" v-if="Det.show">
        <div class="correct-title">
          <span class="green" v-if="list[nowIndex].user_answer == list[nowIndex].answer">正确</span>
          <span class="red" v-if="list[nowIndex].user_answer != list[nowIndex].answer">错误</span>
          <span>正确答案：{{list[nowIndex].answer}}</span>
        </div>
        解析：{{list[nowIndex].analysis? list[nowIndex].analysis: '暂无'}}
      </div>

      <div class="footer">
        <div class="left btn" @click="pre">上一题</div>
        <div class="right btn" @click="next">下一题</div>
      </div>
    </div>

    <div class="warp-panel" v-show="!ifIng">
      <section class="panel">
        <div class="title" v-if="!Det.show">答题进度：{{panel.progress? panel.progress: 0}}%</div>
        <div class="desc" v-if="!Det.show">未答题目数： {{panel.noAnswerNum? panel.noAnswerNum: 0}} 个</div>
        <div class="look-detail first" v-if="Det.show">考试科目： {{Det.name}}</div>
        <div class="look-detail" v-if="Det.show">所得分数： {{Det.fraction}}</div>
        <div class="timu" v-if="panel.no0.length">
          <div class="inner-title">单选题：</div>
          <ul class="handlelist">
            <li
              :class="{ right: Det.show, wrong: Det.show&&item.reslut0!=1}"
              v-for="(item, index) in panel.no0"
              :key="index"
              @click="choseOne(item.index)"
            >{{item.index+1}}</li>
          </ul>
        </div>
        <div class="timu" v-if="panel.no1.length">
          <div class="inner-title">共答题：</div>
          <ul class="handlelist">
            <li
              :class="{right: Det.show, wrong:  Det.show&&item.reslut0!=1}"
              v-for="(item, index) in panel.no1"
              :key="index"
              @click="choseOne(item.index)"
            >{{item.index+1}}</li>
          </ul>
        </div>

        <div class="timu" v-if="panel.no2.length">
          <div class="inner-title">共题题：</div>
          <ul class="handlelist">
            <li
              :class="{right: Det.show, wrong:  Det.show&&item.reslut0!=1}"
              v-for="(item, index) in panel.no2"
              :key="index"
              @click="choseOne(item.index)"
            >{{item.index+1}}</li>
          </ul>
        </div>

        <div class="timu" v-if="panel.no3.length">
          <div class="inner-title">多选题：</div>
          <ul class="handlelist">
            <li
              :class="{right: Det.show, wrong:  Det.show&&item.reslut0!=1}"
              v-for="(item, index) in panel.no3"
              :key="index"
              @click="choseOne(item.index)"
            >{{item.index+1}}</li>
          </ul>
        </div>
      </section>
      <footer>
        <div class="cel" @click="jiaojuan(1)" v-if="!Det.show">交卷</div>
      </footer>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Checkbox, CheckboxGroup, Toast, Dialog } from "vant";

// 全局注册
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  data() {
    return {
      token: "",
      // 考试编码
      backtitle: "答题中",
      number: "",
      type: "",
      // 题目list
      list: [
        {
          id: 442,
          pid: 1,
          mid: null,
          oid: 1,
          case: "",
          title: "题目...",
          a: "a",
          b: "b",
          c: "c",
          d: "d",
          e: "e",
          analysis: "",
          answer: "abc",
          type: 3,
          level: 1,
        },
      ],
      // 当前显示的题目的index
      nowIndex: 0,
      // 答案list
      answerlist: [],
      id: {
        pid: 0,
        mid: 0,
        oid: 0,
      },
      // 是否为正在答题状态
      ifIng: true,
      panel: {
        noAnswerNum: -1,
        // 未答题分为  // 0单选, 1共答，2共题，3多选  （除了3都是单选）
        no0: [],
        no1: [],
        no2: [],
        no3: [],
      },
      // 继续答题状态
      continueIng: false,
      // 查看答案解析
      Det: {
        // 是否为答案解析功能
        show: false,
        name: "",
        fraction: "",
      },
      hasHandlePaper: false, // 是否点击过交卷
      zhenId: '',
      realFlag: false // 标识现在答题是真题
    };
  },
  mounted() {
    this.token = window.sessionStorage.getItem("token");
    const number = this.$route.query.number;
    const seeDetail = this.$route.query.seeDetail;
    
    // 新增
    // 若是从真题进入考试
    const zhenId = this.$route.query.zhenId
    if(zhenId) {
      this.zhenId = zhenId
    }

    const realFlag = this.$route.query.realFlag
    if(realFlag) {
      this.realFlag = realFlag
    }
    // 新增ends
    
    this.number = number;
    // console.log(number)
    if (number && !seeDetail) {
      // 如果有number，是继续答题
      this.backtitle = "继续答题";
      this.continueIng = true;
      this.getContinueData();
    } else if (seeDetail) {
      // 是查看得分详情
      console.log("查看得分详情");
      this.scoreDetails();
    } else {
      // 是新开考试
      this.id = this.$route.query.id;
      // console.log(this.id)
      this.getData();
    }
  },
  watch: {
    // 监听到切换  答题中---面板
    ifIng(newV, oldV) {
      // console.log(newV)
      if (!newV && !this.Det.show) {
        // 进入答题 面板页
        let noAnswerNum = 0;
        this.panel.no1 = [];
        this.panel.no0 = [];
        this.panel.no3 = [];
        this.panel.no2 = [];
        this.list.map((item, index, arr) => {
          arr[index].index = index;
          arr[index].user_answer = this.answerlist[index];
          if (!this.answerlist[index]) {
            noAnswerNum++;
            const type = item.type;
            const notext = "no" + type;
            this.panel[notext].push(item);
          }
        });
        this.panel.noAnswerNum = noAnswerNum;
        this.panel.progress = parseInt(
          (1 - noAnswerNum / this.list.length) * 100
        );
      } else {
        // 返回答题中，或者点击单个未答题
      }
    },
  },
  methods: {
    // 显示题目解析
    handleShow(_idx, _str) {
      // 若是真题答题Or继续答真题 选择了不会进行答案解析
      if(!this.zhenId || !this.realFlag) {
         this.Det.show = true;
      }

      let arr = this.list;
      arr[_idx].user_answer = _str;
      this.list = arr;
    },

    // 继续答题时调用
    getContinueData() {
      console.log(this.number);
      this.WR.get("/api/v1/continueAnswer", {
        token: this.token,
        number: this.number,
      }).then((rs) => {
        console.log(rs);
        if (rs.code === 0) {
          this.list = rs.data;
          // this.ifIng = false
        }
      });
    },
    // 得到习题
    getData() {
      this.$load.show();
      // console.log(this.token)
      let url = "/api/v1/getExercise";
      if (this.$route.query.zhenId) {
        url = "/api/v1/startExam";
        console.log("是历年真题考试");
      }
      this.WR.post(url, {
        token: this.token,
        pid: this.id.pid,
        mid: this.id.mid ? this.id.mid : 0,
        oid: this.id.oid,
        paper_id: this.$route.query.zhenId,
      }).then((rs) => {
        // console.log((rs))
        if (rs.code === 0) {
          // console.log(JSON.stringify(rs.data.list.length))
          const data = rs.data;
          this.number = data.number;
          this.list = data.list;
        } else {
          if (rs.code == 1) {
            Toast("当前未找到题库");
            history.go(-1);
          }
        }
        this.$load.hide();
      });
    },
    // 上一题
    pre() {
      if (this.nowIndex <= 0) {
        // 已经是第一题
        Toast("已经是第一题");
      } else {
        this.nowIndex--;
      }
    },
    // 下一题
    next() {
      this.Det.show = false;
      // console.log(this.answerlist.length)
      if (this.nowIndex >= this.list.length - 1) {
        // 已经是最后一题，提示交卷
        Dialog.confirm({
          title: "已经是最后一题",
          message: "是否进入答题总览?",
        })
          .then(() => {
            // on confirm
            this.ifIng = false;
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.nowIndex++;
      }
    },
    // 考试完毕，查看得分详情
    scoreDetails() {
      // 先清空答题预览的中的数据
      this.panel.no0 = [];
      this.panel.no1 = [];
      this.panel.no2 = [];
      this.panel.no3 = [];

      this.ifIng = false;
      this.backtitle = "查看得分详情";
      this.Det.show = true;
      this.WR.post("/api/v1/scoreDetails", {
        token: this.token,
        number: this.number,
      }).then((rs) => {
        this.list = rs.data.details;
        // 处理数据
        this.list.map((item, index, arr) => {
          arr[index].index = index;
          let answerArr = [];

          if (item.user_answer.length > 1) {
            answerArr = item.user_answer.split(",");
          } else {
            answerArr.push(item.user_answer);
          }
          this.answerlist.push(answerArr);
          // 正确还是错误result 0 错误，1正确
          const type = item.type; // 0 单选
          const notext = "no" + type;
          arr[index].reslut0 = item.result;
          this.panel[notext].push(item);
        });

        console.log(rs);
        this.Det.name = rs.data.name;
        this.Det.fraction = rs.data.fraction;
        // console.log(this.answerlist)
      });
    },

    // 点击返回按钮后back
    ifJiaojuan(type) {
      // if (!this.Det.show) {
      //   // 判断是否该交卷
      //   // 1在答题中且从未进入答题面板页面，交卷
      //   if (this.ifIng && this.panel.noAnswerNum === -1) {
      //     Dialog.confirm({
      //       title: "您还没有做完试卷",
      //       message: "是否退出答题?（会自动为您保存进度）",
      //     }).then(() => {
      //       this.jiaojuan(type);
      //       this.$router.push("/");
      //     });
      //   } else if (this.ifIng && this.panel.noAnswerNum !== -1) {
      //     // 2在答题中，但已已进入过答题面板，返回答题面板
      //     this.ifIng = false;
      //   } else if (this.continueIng) {
      //     // 是继续答题的状态，返回查看考试记录，并保持一下记录
      //     Dialog.confirm({
      //       title: "您还没有做完试卷",
      //       message: "是否退出答题?（会自动为您保存进度）",
      //     }).then(() => {
      //       this.jiaojuan(type);
      //       this.$router.push("/");
      //     });
      //   } else {
      //     // 3在答题面板中，返回答题Ing
      //     this.ifIng = true;
      //   }
      // } else {
      //   if (this.ifIng) {
      //     // 是查看详情
      //     // --单个详情后按的返回
      //     this.ifIng = !this.ifIng;
      //   } else {
      //     this.$router.go(-1);
      //   }
      // }

      // 修改v2
      
      // 如果已经交卷过
      if (this.hasHandlePaper) {
        this.jiaojuan(type);
        this.$router.push("/");
      }
      // 判断是否该交卷
      // 1在答题中且从未进入答题面板页面，交卷
      if (this.ifIng && this.panel.noAnswerNum === -1) {
        Dialog.confirm({
          title: "您还没有做完试卷",
          message: "是否退出答题?（会自动为您保存进度）",
        }).then(() => {
          this.jiaojuan(type);
          this.$router.push("/");
        });
      } else if (this.ifIng && this.panel.noAnswerNum !== -1) {
        // 2在答题中，但已已进入过答题面板
        this.ifIng = false;
        this.jiaojuan(type);
        this.$router.push("/"); // 已经交卷 直接回到个人中心了
      } else if (this.continueIng) {
        // 继续答题的状态 从继续答题页进入
        Dialog.confirm({
          title: "您还没有做完试卷",
          message: "是否退出答题?（会自动为您保存进度）",
        }).then(() => {
          this.jiaojuan(type);
          this.$router.push("/");
        });
      } else {
        // 3在答题面板中，返回答题Ing
        this.ifIng = true;
      }
    },
    // 交卷
    jiaojuan(type) {
      // / 状态 0=返回未提交 1=提交答题

      // 一旦点击过交卷
      this.hasHandlePaper = true;

      const data = this.handleData();
      this.$load.show();
      this.WR.post("/api/v1/saveAnswer", {
        token: this.token,
        number: this.number,
        status: type,
        data: JSON.stringify(data),
      }).then((rs) => {
        this.$load.hide();
        console.log(rs);
        if (rs.code === 0 && type === 1) {
          // 主动交卷后查看答案解析
          this.scoreDetails();
        }
      });
    },

    // 交卷或者返回，处理数据
    handleData() {
      console.log(this.answerlist);
      const list = [];
      this.list.map((item, index) => {
        const str = this.answerlist[index]
          ? this.answerlist[index].toString()
          : "";
        list.push({
          id: this.list[index].id,
          user_answer: str,
        });
      });
      console.log(list);
      return list;
    },

    // 在面板中选择一个未答题继续答题
    choseOne(index) {
      // 暂时关闭 答题结束 不再关闭
      return;
      console.log(index);
      this.ifIng = true;
      this.nowIndex = index;
    },
  },
};
</script>
