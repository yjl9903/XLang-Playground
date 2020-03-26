<template>
  <div>
    <el-row type="flex" align="middle" :gutter="10">
      <el-col :span="18">
        <el-input v-model="input" placeholder="文件名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="$emit('rename', input)"
          >重命名</el-button
        >
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-dropdown @command="item => $emit('addExample', item)">
        <el-button type="primary" size="small">
          导入示例<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in examples"
            :key="item.name"
            :command="item"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script>
import Examples from '../../xlang/examples';

export default {
  name: 'Playground-File',
  props: {
    fileName: String
  },
  data() {
    return {
      examples: Examples,
      input: this.fileName
    };
  },
  watch: {
    fileName(nV) {
      this.input = nV;
    }
  }
};
</script>

<style></style>
