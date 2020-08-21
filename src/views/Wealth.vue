<!--
 * @Date         : 2020-05-12 09:36:58
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-20 17:04:06
 * @FilePath: \Offcial_exam\src\views\Wealth.vue
 * @Description  : 我的财富
 -->
<style lang="scss" scoped>
//  个人中心
header {
  height: 2.5rem;
  background-image: url("http://hukaobang.caimaomeng.com/static/kaoshi/img/top-bg.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.28rem;
  box-sizing: border-box;
  img.pic {
    width: 1.2rem;
    height: 1.2rem;
    background-color: #fff;
    border-radius: 50%;
    object-fit: cover;
  }
  .content {
    flex: 1;
    padding: 0.2rem;
    box-sizing: border-box;
    font-size: 0.3rem;
    .fff {
      color: #fff;
    }
    .top {
      width: 100%;
      height: 1rem;
      .text {
        float: right;
        span:nth-of-type(2) {
          color: rgba(255, 0, 0, 0.795);
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .left {
        span:nth-of-type(2) {
          color: orange;
        }
      }
      .mid {
        span:nth-of-type(2) {
          color: blue;
        }
      }
      .right {
        span:nth-of-type(2) {
          color: rgba(255, 51, 0, 0.664);
        }
      }
    }
  }
}
</style>
<template>
  <div class="wealth">
    <BackBar class="fixed">我的财富</BackBar>
    <header>
      <img :src="avatar" alt class="pic" />
      <div class="content">
        <div class="top">
          <div class="text" v-if="agent > 0">
            <span v-if="agent==1">区代</span>
            <span v-if="agent==2">院代</span>
            <span v-if="!is_agent" @click="applyAgent()">-未生效</span>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <span class="fff">星星：</span>
            <span>{{star}}</span>
          </div>
          <div class="mid">
            <span class="fff">钻石：</span>
            <span>{{diamond}}</span>
          </div>
          <div class="right">
            <span class="fff">红宝石：</span>
            <span>{{ruby}}</span>
          </div>
        </div>
      </div>
    </header>
    <van-cell-group>
      <van-cell title="星星兑换" is-link :to="{ name: 'Exchange',query: {type: 1}}" />
      <van-cell title="钻石兑换" is-link :to="{ name: 'Exchange',query: {type:2}}" />
      <van-cell title="申请提现" is-link to="wealth/get" />
      <van-cell title="邀请记录" is-link to="wealth/record" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, Icon, Dialog } from "vant";

// 全局注册
Vue.use(Dialog);
Vue.use(Icon);

Vue.use(Cell);
Vue.use(CellGroup);
export default {
  data() {
    return {
      token: "",
      avatar: "",
      // 代理级别是否生效
      is_agent: "",
      // 代理级别 1=区代, 2=院代
      agent: "",
      star: "",
      diamond: "",
      ruby: "",
    };
  },
  mounted() {
    this.token = window.sessionStorage.getItem("token");
    this.getData();
  },
  methods: {
    getData() {
      this.$load.show();
      this.WR.post("/api/v1/myWealth", {
        token: this.token,
      }).then((rs) => {
        console.log(JSON.stringify(rs));
        if (rs.code === 0) {
          const data = rs.data;
          this.avatar = data.avatar;
          this.is_agent = data.is_agent;
          this.agent = data.agent;
          this.star = data.star;
          this.diamond = data.diamond;
          this.ruby = data.ruby;
        }

        this.$load.hide();
      });
    },
    applyAgent() {
      if (!this.agent) {
        return;
      }
      Dialog.confirm({
        title: "确认缴费",
        message: "未生效状态下代理等级不生效，确认立即缴费？",
      }).then(() => {
        console.log(1);
        // console.log(this.id)
        this.WR.post("/api/v1/agencyFeeWxPay", {
          token: window.sessionStorage.getItem("token"),
        }).then((rs) => {
          console.log(rs);
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
                  console.log('支付成功'); 
                } else {
                  console.log('支付失败'); 
                }
              }
            );
          }
        });
      });
    },
  },
  components: {
    // HelloWorld
  },
};
</script>
