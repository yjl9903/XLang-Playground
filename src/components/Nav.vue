<template>
  <el-menu
    id="nav"
    router
    :default-active="activeIndex"
    :class="[
      'text-center',
      ...(isMobile ? [] : ['el-row', 'is-align-middle', 'el-row--flex'])
    ]"
    :mode="isMobile ? 'vertical' : 'horizontal'"
  >
    <el-col :span="2" :xs="0"></el-col>
    <el-menu-item index="/" class="nav-logo no-select" :to="{ name: 'Home' }"
      >XLang</el-menu-item
    >
    <el-menu-item index="/playground">游乐场</el-menu-item>
    <el-menu-item index="/lex">词法</el-menu-item>
    <el-menu-item index="/syntax">语法</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'XLangNav',
  data() {
    return {
      activeIndex: window.location.pathname
    };
  },
  computed: {
    width() {
      return this.$store.state.width;
    },
    isMobile() {
      return this.width < 430;
    }
  }
};
</script>

<style>
#nav {
  margin: 0 auto;
}

#nav .nav-logo {
  font-size: 23px;
  /* border-bottom: 2px solid #409eff !important; */
  color: #303133;
}
</style>
