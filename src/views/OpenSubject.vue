<!--
 * @Date         : 2020-05-25 17:44:57
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-20 15:52:52
 * @FilePath: \Offcial_exam\src\views\OpenSubject.vue
 * @Description  : 开通科目
-->
<style lang="scss" scoped>
main {
  margin: 0.8rem;
  font-size: 0.3rem;
  .title,
  .level,
  .fee {
    font-size: 0.32rem;
    margin-bottom: 0.5rem;
  }
}
footer {
  position: fixed;
  width: 100%;
  bottom: 1rem;
  left: 0;
  height: 0.8rem;
  font-size: 0.32rem;
  .cell {
    height: 100%;
    margin: 0 auto;
    line-height: 0.8rem;
    text-align: center;
    background: #eee;
    width: 2.5rem;
    border-radius: 0.1rem;
  }
}
</style>
<template>
  <div>
    <BackBar>开通科目</BackBar>
    <main>
      <div class="title">科目名称：{{name}}</div>
      <div class="level">会员等级：{{level}}</div>
      <div class="fee">开通费用： ￥{{price}}</div>
    </main>
    <footer>
      <div class="cell" @click="open">开通科目</div>
    </footer>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog } from "vant";

// 全局注册
Vue.use(Dialog);
export default {
  data() {
    return {
      name: "",
      level: "",
      pid: "",
      price: "",
    };
  },
  mounted() {
    const query = this.$route.query;
    this.name = query.name;
    this.pid = query.pid;
    console.log(query);
    const user = JSON.parse(window.sessionStorage.getItem("userinfo"));
    console.log(user);
    const levelV = user.level;
    this.price = user.purchase_account_price;
    switch (levelV) {
      case 0:
        this.level = "试用";
        break;

      case 1:
        this.level = "普通会员";
        break;
      case 2:
        this.level = "高级会员";
        break;
    }
  },
  methods: {
    open() {
      Dialog.confirm({
        title: "确认开通",
        message: `您确定开通科目：${this.name}, 费用：￥${this.price}?`,
      })
        .then(() => {
          this.WR.post("/api/v1/openAccount", {
            token: window.sessionStorage.getItem("token"),
            subjects: this.pid,
          }).then((rs) => {
            if (rs.code === 0) {
              const data = rs.data;
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: data.appId, //公众号名称，由商户传入
                  timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
                  nonceStr: data.nonceStr, //随机串
                  package: data.package,
                  signType: "MD5", //微信签名方式：
                  paySign: data.paySign, //微信签名
                },
                (res) => {
                  console.log(res);
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    console.log("支付成功");
                  } else {
                    console.log("支付失败");
                  }
                }
              );
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
