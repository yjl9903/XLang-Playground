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
      <el-button
        type="primary"
        size="small"
        style="margin-left: 5px;"
        @click="handleClickInput"
        >导入文件</el-button
      >
      <input
        style="display: none"
        ref="input"
        type="file"
        name="file"
        accept=".xl,.txt"
        @change="handleChange"
      />
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
  },
  methods: {
    handleClickInput() {
      this.$refs.input.dispatchEvent(new MouseEvent('click'));
    },
    handleChange() {
      const inputFile = this.$refs.input.files[0];
      if (inputFile !== undefined) {
        const name = inputFile.name.replace('.xl', '').replace('.txt', '');
        const reader = new FileReader();
        reader.readAsText(inputFile, 'utf-8');
        reader.addEventListener('load', e => {
          this.$emit('addExample', {
            name,
            content: e.target.result
          });
        });
      }
    }
  }
};
</script>

<style></style>
