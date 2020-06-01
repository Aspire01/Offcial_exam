<!--
 * @Date         : 2020-05-09 11:18:16
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-15 13:49:27
 * @FilePath     : \kaoshi\src\components\BackBar.vue
 * @Description  : 返回头公共组件
 -->
 <style lang="scss">
.backbar {
  display: flex;
  @include rect(100%, 1.2rem);
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 0.25rem;
  box-sizing: border-box;
  font-size: 0.34rem;
  color:#333;
  // border-bottom: 1px solid #eee;
  .left,
  .right {
    width: 1rem;
    display: flex;
    align-items: center;
  }
}
</style>
 <template>
  <div class="backbar van-hairline--bottom">
    <div class="left"  v-on:click="back">
      <van-icon name="arrow-left" />
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>
<script>
export default {
  // props: {
  //   answerlist: {
  //     Type: Array
  //   }
  // },
  name: 'BackBar',

  methods: {
    back () {
      if (this.$route.name === 'Exam') {
        // console.log(this.answerlist)
        // 状态 0=返回未提交 1=提交答题
        this.$parent.ifJiaojuan(0)
        return
      }
      this.$router.go(-1)
    }

  }
}
</script>
