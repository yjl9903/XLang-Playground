<template>
  <div>
    <el-input
      type="textarea"
      :rows="3"
      :autosize="{ minRows: 3, maxRows: 9 }"
      placeholder=""
      v-model="value"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'Playground-In',
  data: () => ({ value: '' })
};
</script>
