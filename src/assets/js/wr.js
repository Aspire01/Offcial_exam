/*
 * @Date         : 2020-04-30 10:41:48
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-26 14:37:09
 * @FilePath: \Offcial_exam\src\assets\js\wr.js
 */
import axios from 'axios'
import QS from 'qs'
// const BASE_URL = 'http://hukaobang1.weirong100.com'
// const BASE_URL = 'http://hukaobang2.weirong100.com'
const BASE_URL = 'http://yaokaoyi.10yuih.cn' // 正式版本域名
const obj = {
  // 封装axios
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(BASE_URL + url, {
        params: params
      }).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(BASE_URL + url, QS.stringify(params))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err.data)
        })
    })
  },
  base_url: BASE_URL
}
export default obj
