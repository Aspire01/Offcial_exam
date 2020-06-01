<!--
 * @Date         : 2020-05-11 11:12:39
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-26 10:40:44
 * @FilePath     : \kaoshi\src\views\SureSubject.vue
 * @Description  : 确认科目
 -->
 <style lang="scss" scoped>
   main{
     margin: .8rem;
     font-size: .32rem;
     .title{
       margin-bottom: .5rem;
     }
     .last{
       span{
         &:nth-of-type(1){
           font-size: .3rem;
         }
       }
     }
   }
   footer{
     position: fixed;
     bottom: 1rem;
     left: 0;
     width: 100%;
     display: flex;
     justify-content: space-around;
     align-items: center;
     .cell{
       height: .8rem;
       line-height: .8rem;
       border-radius: .1rem;
       background-color: #eee;
       width: 2.4rem;
       font-size: .32rem;
      text-align: center;
     }
   }
 </style>
<template>
  <div>
    <BackBar>确认科目</BackBar>
    <main>
      <div class="title">{{name}}</div>
      <div class="last">
        <span>剩余次数： </span> <span>{{num}}</span>
      </div>
    </main>
    <footer>
      <div class="cell" @click="charge">充值次数</div>
      <div class="cell" @click="start">开始考试</div>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      id: {
        pid: '',
        mid: '',
        oid: ''
      },
      num: 0,
      money: ''
    }
  },
  mounted () {
    const list = JSON.parse(this.$route.query.list)
    // console.log(list)
    const p = this.$route.query.pindex
    const m = this.$route.query.mindex
    const o = this.$route.query.oindex
    // console.log(list[p])
    // console.log(list[p].child[o])
    // console.log(list[p].child[m].child[o])
    // console.log(p)
    // console.log(m)
    // console.log(o)
    let name = ''
    let num = 0
    if (m || m === 0) {
      // 有二级时

      name = `${list[p].name} - ${list[p].child[m].name} - ${list[p].child[m].child[o].name}`
      num = list[p].child[m].child[o].num
      this.id.mid = list[p].child[m].id
      this.id.oid = list[p].child[m].child[o].id
    } else {
      // 无二级时

      name = `${list[p].name} - ${list[p].child[o].name}`
      num = list[p].child[o].num
      this.id.oid = list[p].child[o].id
    }
    console.log(name)
    this.name = name
    this.num = num
    this.id.pid = list[p].id
  },
  methods: {
    // 充值次数
    charge () {
      const obj = {
        name: this.name,
        num: this.num,
        fee: this.money,
        id: this.id
      }
      this.$router.push({ path: '/charge', query: obj })
    },
    // 开始考试
    start () {
      console.log('begin')
      this.$router.push({ path: '/exam', query: { id: this.id } })
    }
  }
}
</script>
