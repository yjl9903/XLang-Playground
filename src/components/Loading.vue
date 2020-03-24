<template>
  <div
    :style="{ height, width }"
    v-loading="true"
    element-loading-text="拼命加载中"
    element-loading-background="#F2F6FC"
  ></div>
</template>

<script>
export default {
  name: 'Loading',
  data: () => ({
    width: '100%',
    height: '100%'
  })
};
</script>
