<!--
 * @Date         : 2020-05-15 10:27:03
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-15 17:36:56
 * @FilePath     : \kaoshi\src\views\ExamDetails.vue
 * @Description  : 查看考试答案详情
-->
<template>
  <div>
    <BackBar>查看得分情况</BackBar>
    <main>
      <div class="title">答题进度：</div>
      <div class="desc">未答题目数： {{noAnswer}}题</div>
      <div class="panel">
        <ul class="list">
          <li>1</li>
        </ul>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data () {
    return {
      noAnswer: 0,
      //
      list: []
    }
  }
}
</script>
