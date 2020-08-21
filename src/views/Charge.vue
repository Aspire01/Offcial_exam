<!--
 * @Date         : 2020-05-11 15:33:15
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-20 16:40:06
 * @FilePath: \Offcial_exam\src\views\Charge.vue
 * @Description  : 充值次数
 -->

 <style lang="scss" scoped>
main {
  margin: 0.8rem;
  font-size: 0.3rem;
  .title {
    font-size: 0.32rem;
    margin-bottom: 0.5rem;
  }
  .charge-num {
    display: flex;
    align-items: center;
    margin: 0.4rem 0;
    .handle {
      display: flex;
      align-items: center;
      span {
        padding: 0.2rem 0.28rem;

        background-color: #eee;
      }
      .num {
        width: 1rem;
        text-align: center;
        padding: 0.2rem 0.1rem;
        background-color: #eee;
        margin: 0 0.1rem;
      }
    }
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
    <div>
      <BackBar>充值次数</BackBar>
      <main>
        <div class="title">{{name}}</div>
        <div class="last">
          <span>剩余次数：</span>
          <span>{{num}}</span>
        </div>
        <div class="charge-num">
          <span>充值次数：</span>
          <div class="handle">
            <span @click="dec">-</span>
            <div class="num">{{chargeNum}}</div>
            <span @click="add">+</span>
          </div>
        </div>
        <div class="money">
          <span>充值费用：</span>
          <span>{{purchase_price}}元/次</span>
        </div>
      </main>
      <footer>
        <div class="cell" @click="sure">确认支付</div>
      </footer>
    </div>
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
      num: 0,
      money: "",
      chargeNum: 1,
      purchase_price: 0.0,
      id: "",
    };
  },
  mounted() {
    const obj = this.$route.query;
    this.name = obj.name;
    this.num = obj.num;
    this.id = obj.id;
    this.purchase_price = JSON.parse(
      window.sessionStorage.getItem("userinfo")
    ).purchase_price;
  },
  methods: {
    add() {
      this.chargeNum++;
    },
    dec() {
      if (this.chargeNum <= 1) {
        Dialog({ message: "不能再减少了，至少选择1次" });
      } else {
        this.chargeNum--;
      }
    },
    sure() {
      const total = this.chargeNum * this.purchase_price;
      // console.log('确认支付')
      Dialog.confirm({
        title: "确认支付",
        message: `您购买科目:${this.name}，次数：${this.chargeNum}, 单次费用：${this.purchase_price}元，共${total}元?`,
      })
        .then(() => {
          console.log(1);
          const sendid = `${this.id.pid},${this.id.mid},${this.id.oid}`;
          // console.log(this.id)
          this.WR.post("/api/v1/purchases", {
            token: window.sessionStorage.getItem("token"),
            subjects: sendid,
            frequency: this.chargeNum,
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
