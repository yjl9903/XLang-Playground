<template>
  <div id="app" class="full-height">
    <XLangNav></XLangNav>
    <el-row v-if="$route.name !== 'Home'" style="margin-top: 20px;">
      <el-col :push="2" :span="20" :xs="{ push: 0, span: 24 }">
        <router-view></router-view>
      </el-col>
    </el-row>
    <div v-else class="full-height">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
    <el-backtop>
      <i class="el-icon-caret-top" style="font-size: 24px"></i>
    </el-backtop>
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
.el-tabs__header.is-top {
  margin-bottom: 0 !important;
}
</style>
