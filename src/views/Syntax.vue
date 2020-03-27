<template>
  <div>
    <el-row v-if="mounted" style="min-height: 525px; height: 525px;">
      <el-col :span="12" style="height: 100%;">
        <Editor
          style="border-top: 1px solid rgb(238, 238, 238)"
          ref="editor"
          v-model="code"
        ></Editor>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@/components/LazyEditor';

export default {
  name: 'Syntax',
  components: {
    Editor
  },
  data: () => ({
    mounted: false,
    code: ''
  }),
  mounted() {
    this.mounted = true;
  }
};
</script>

<style></style>
