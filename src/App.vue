<template>
  <div id="app" class="full-height">
    <XLangNav></XLangNav>
    <el-row v-if="$route.name !== 'Home'" style="margin-top: 20px;">
      <el-col :push="2" :span="20" :xs="{ push: 0, span: 24 }">
        <transition name="el-fade-in">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
    <div v-else class="full-height">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
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
