<template>
  <el-card class="box-card">
    <div v-for="(row, rIndex) in console" :key="rIndex">
      <span v-for="(col, cIndex) in row" :key="cIndex">{{ col }}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Playground-Console',
  data: () => ({}),
  computed: {
    console() {
      return this.$store.state.playground.console;
    }
  }
};
</script>

<style></style>
