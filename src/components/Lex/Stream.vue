<template>
  <div class="stream">
    <p
      class="d-flex align-center justify-space-between"
      style="height: 40px; line-height: 40px; width: 100%; margin: 0; border-bottom: 1px solid rgb(235, 238, 245);"
    >
      <span>Token 流</span>
      <el-tooltip content="词法解析" placement="top">
        <el-button
          type="success"
          style="padding: 7px; font-size: 22px;"
          icon="el-icon-caret-right"
          circle
          @click="$emit('run')"
        ></el-button>
      </el-tooltip>
    </p>
    <el-card style="margin-top: 10px; max-height: 475px; overflow-x: auto;">
      <div
        v-for="token in tokens"
        :key="token.position.row + ',' + token.position.col"
      >
        <el-popover :offset="10" placement="top-start" trigger="hover">
          第 {{ token.position.row + 1 }} 行, 第 {{ token.position.col + 1 }} 列
          <el-button style="padding: 0" type="text" slot="reference"
            >{{ token.value }} | 类型: {{ token.type }}</el-button
          >
        </el-popover>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Lex-TokenStream',
  props: {
    tokens: Array
  },
  data: () => ({})
};
</script>
