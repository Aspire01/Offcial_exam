<!--
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-18 18:24:58
 * @FilePath: \Offcial_exam\src\App.vue
 * @Description  :
 -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body{
  height: 100%;
  background: rgba(247, 247, 247, 1);
  overflow-y: scroll;
}

</style>
<script>
export default {
  data () {
    return {
      code: ''
    }
  },
  mounted () {
    // 判断有无code，没有就去qq授权取得，取得后用code请求后端接口
    this.getCode()
  },
  methods: {
    getCode () { // 非静默授权，第一次有弹框
      this.code = ''
      var local = window.location.href // 获取页面url
      var appid = 'wxe5594f461e34f65f'
      this.code = this.getUrlCode().code // 截取code
      if (!this.code) { // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      } else {
        // 你自己的业务逻辑
        // alert(`这是code: ${this.code}`)
        this.getInfo()
      }
    },
    getUrlCode () { // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = { }
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      }
      return theRequest
    },
    getInfo () {
      const _this = this
      this.WR.post('/api/base/wxLogin', {
        code: _this.code
      }, this).then((rs) => {
        if (rs.code === 0) {
          // alert(JSON.stringify(rs))
          const token = rs.data.token
          window.sessionStorage.setItem('token', token)
        }
      })
    }
  }
  // methods: {
  //   getData () {
  //     // const baseurl = window.location.protocol + '//' + window.location.host
  //     this.WR.get('/api/v1/register')
  //       .then((rs) => {
  //         console.log(rs)
  //         alert('正确' + JSON.stringify(rs))
  //       }, (err) => {
  //         console.log(err)
  //         alert(JSON.stringify(err))
  //       })
  //   }
  // }
}
</script>
