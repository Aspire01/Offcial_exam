/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-06 14:04:43
 * @FilePath     : \kaoshi\babel.config.js
 * @Description  : import按需引入vant
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
