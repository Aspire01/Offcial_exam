<!--
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors: Ares
 * @LastEditTime: 2020-08-24 18:11:05
 * @FilePath: \Offcial_exam\src\App.vue
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
  },
  methods: {
  },
};
</script>
