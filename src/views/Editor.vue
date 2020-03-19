<template>
  <div class="editor-container">
    <monaco-editor class="editor" v-model="code" language="javascript" />
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  name: "Editor",
  components: {
    MonacoEditor
  },
  data: () => ({
    code: "const noop = () => {}"
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
