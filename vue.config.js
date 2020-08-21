/*
 * @Date         : 2019-12-11 16:50:10
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-18 17:47:17
 * @FilePath: \Offcial_exam\vue.config.js
 */
module.exports = {
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://ks.yuchaosheng.com/api',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
  // 解决scss文件全局引入的问题
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/assets/scss/init.scss'
        })
        .end()
    })
  },

  lintOnSave: false
}
