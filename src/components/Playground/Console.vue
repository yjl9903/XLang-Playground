<template>
  <el-card class="box-card">
    <div v-for="(row, rIndex) in console" :key="rIndex">
      <span
        v-for="(col, cIndex) in row"
        :key="cIndex"
        :style="{ color: col.color }"
        v-html="col.text"
      ></span>
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

<style>
.box-card {
  overflow-x: auto;
}

.box-card::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.4rem;
}

.box-card::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.26);
}
</style>
