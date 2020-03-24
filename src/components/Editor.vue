<template>
  <div class="editor-container">
    <monaco-editor
      class="editor"
      v-model="code"
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
  tabSize: 2,
  contextmenu: false
};

export default {
  name: 'Editor',
  components: {
    MonacoEditor
  },
  data: () => ({
    code: `fn main() {\n\t\n}`,
    editorOptions
  })
};
</script>

<style scoped>
.editor-container {
  display: flex;
  justify-content: center;
  text-align: left;
}

.editor {
  width: 800px;
  height: 500px;
  border: 1px solid rgb(238, 238, 238);
}
</style>
