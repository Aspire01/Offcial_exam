<!--
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-26 14:36:32
 * @FilePath: \Offcial_exam\src\views\Auth.vue
 * @Description  :
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}
</style>
<script>
export default {
  data() {
    return {
      code: "",
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    getCode() {
      // 非静默授权，第一次有弹框
      this.code = "";
      var local = window.location.href; // 获取页面url
      // var appid = "wxab18e50750484ecd";
      // var appid = "wxbeccb327c1f4080b";
      var appid = "wxe5594f461e34f65f"; // 正式版
      this.code = this.getUrlCode().code; // 截取code
      if (!this.code) {
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
      } else {
        this.getToken();
      }
    },

    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = {};
      if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },

    getToken() {
      const _this = this;
      this.WR.post(
        "/api/base/wxLogin",
        {
          code: _this.code,
        },
        this
      ).then((rs) => {
        if (rs.code === 0) {
          // alert(JSON.stringify(rs))
          const token = rs.data.token;
          window.sessionStorage.setItem("token", token);

          // 得到token之后重新回到首页渲染数据 关键
          // 因为在通过微信获取code之后重定向到/auth之下
          this.$router.push('/') 
        }
      });
    },
  },
};
</script>
