<template>
  <div class="playground">
    <div v-if="mounted">
      <Editor></Editor>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Editor from '@/components/LazyEditor';

export default {
  name: 'Home',
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
