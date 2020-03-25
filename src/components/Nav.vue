<template>
  <el-menu
    id="nav"
    class="no-select"
    router
    :default-active="activeIndex"
    :class="[
      'text-center',
      ...(isMobile ? [] : ['el-row', 'is-align-middle', 'el-row--flex']),
      this.$route.name === 'Home' ? 'nav-hero' : 'nav-other'
    ]"
    :mode="isMobile ? 'vertical' : 'horizontal'"
  >
    <el-col :span="2" :xs="0"></el-col>
    <el-menu-item index="/" class="nav-logo no-select">XLang</el-menu-item>
    <el-menu-item index="/playground">游乐场</el-menu-item>
    <el-menu-item index="/lex">词法分析</el-menu-item>
    <el-menu-item index="/syntax">语法分析</el-menu-item>
  </el-menu>
</template>

<script>
function getBasePath(url) {
  if (url === '' || url === '/') {
    return '/';
  }
  const reg = /^\/(\w+)/;
  return '/' + reg.exec(url)[1];
}

export default {
  name: 'XLangNav',
  data() {
    return {
      activeIndex: getBasePath(window.location.pathname)
    };
  },
  watch: {
    $route(nRoute) {
      this.activeIndex = getBasePath(nRoute.path);
    }
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
  transition: all 0.3s;
}

#nav .nav-logo {
  font-size: 23px;
  color: #303133;
}

#nav.nav-hero .nav-logo {
  border: none;
  color: white;
}

#nav.nav-hero .nav-logo:hover {
  color: #303133;
}

.el-menu--horizontal.nav-hero > .el-menu-item {
  color: white;
}

.nav-hero {
  position: absolute !important;
  width: 100%;
  background-color: transparent !important;
  border-color: transparent !important;
}

.nav-other {
  position: initial;
  width: 100%;
  background-color: white;
}
</style>
