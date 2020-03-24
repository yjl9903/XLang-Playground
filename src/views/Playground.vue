<template>
  <div class="playground">
    <div v-if="mounted" class="editor-container">
      <Editor></Editor>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/LazyEditor';

export default {
  name: 'Playground',
  components: {
    Editor
  },
  data: () => ({
    mounted: false
  }),
  mounted() {
    this.mounted = true;
  }
};
</script>

<style>
.editor-container {
  height: 500px;
  width: 800px;
}
</style>
