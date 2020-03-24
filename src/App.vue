<template>
  <div id="app">
    <XLangNav></XLangNav>
    <el-row style="margin-top: 20px;">
      <el-col :push="2" :span="20" :xs="{ push: 0, span: 24 }">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import XLangNav from './components/Nav.vue';

export default {
  name: 'app',
  components: {
    XLangNav
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Code&display=swap&subset=latin-ext');

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100%;
  font-size: 16px;
  font-family: 'Fira Code', Consolas, sans-serif, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: #4183c4;
}
</style>
