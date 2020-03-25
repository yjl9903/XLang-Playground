<template>
  <div class="editor-container">
    <monaco-editor
      class="editor"
      v-model="content"
      language="rust"
      :options="editorOptions"
    />
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco';

const editorOptions = {
  lineHeight: 22,
  fontSize: 14,
  fontFamily: `'Fira Code', Consolas, sans-serif, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial`,
  fontLigatures: true,
  tabSize: 2,
  contextmenu: false
};

export default {
  name: 'Editor',
  props: {
    code: String
  },
  model: {
    prop: 'code',
    event: 'change'
  },
  components: {
    MonacoEditor
  },
  data() {
    return {
      editorOptions,
      content: this.code
    };
  },
  watch: {
    code(nV, oV) {
      if (nV !== oV) {
        this.content = nV;
      }
    },
    content(nV, oV) {
      if (nV !== oV) {
        this.$emit('change', nV);
      }
    }
  }
};
</script>

<style scoped>
.editor-container {
  display: flex;
  justify-content: center;
  text-align: left;
}

.editor {
  width: 100%;
  height: 525px;
  border: 1px solid rgb(238, 238, 238);
  border-top: none;
}
</style>
