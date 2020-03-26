<template>
  <div>
    <el-row
      type="flex"
      :gutter="10"
      v-for="(item, index) in params"
      :key="index"
      style="margin-bottom: 10px;"
    >
      <el-col :span="20">
        <el-input
          v-model="params[index]"
          :tabindex="String(index)"
          :placeholder="item"
        ></el-input>
      </el-col>
      <el-col :span="4" style="text-align: center;">
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="params.splice(index, 1)"
        ></el-button>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="10">
      <el-col :span="20">
        <el-button
          type="primary"
          size="small"
          style="width: 100%;"
          @click="params.push('')"
          >添加参数</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button type="danger" size="small" @click="params = ['']"
          >清空</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Playground-Params',
  data: () => ({
    params: ['']
  })
};
</script>
