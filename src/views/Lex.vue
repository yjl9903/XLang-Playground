<template>
  <div>
    <el-row
      v-if="mounted"
      :gutter="10"
      style="min-height: 525px; height: 525px;"
    >
      <el-col :span="12" style="height: 100%;">
        <Editor
          style="border-top: 1px solid rgb(238, 238, 238)"
          ref="editor"
          v-model="code"
        ></Editor>
      </el-col>
      <el-col :span="6">
        <LexStream @run="run" :tokens="tokens" :message="errMsg" />
      </el-col>
      <el-col :span="6">
        <LexConfig ref="config" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@/components/LazyEditor';
import LexConfig from '@/components/Lex/Config.vue';
import LexStream from '@/components/Lex/Stream.vue';
import { XLangLexer } from '../xlang';

export default {
  name: 'Lex',
  components: {
    Editor,
    LexStream,
    LexConfig
  },
  data: () => ({
    mounted: false,
    code: '',
    tokens: [],
    errMsg: []
  }),
  methods: {
    run() {
      try {
        const lexer = this.$refs.config.getLexer();
        try {
          this.errMsg = [];
          this.tokens = lexer.run(this.code);
        } catch (err) {
          this.handleError('词法分析失败:', err.message);
        }
      } catch (err) {
        this.handleError('词法分析器构建失败:', err.message);
      }
    },
    handleError(...msg) {
      this.errMsg = msg.map(s => {
        const res = /^XLex Error: ([\w\W]+), at Row (\d+) Col (\d+).$/.exec(s);
        if (res !== undefined && res !== null) {
          const [, message, row, col] = res;
          return `${message}, 位于第 ${parseInt(row) + 1} 行, 第 ${parseInt(
            col
          ) + 1} 列.`;
        } else {
          return s;
        }
      });
    }
  },
  mounted() {
    this.mounted = true;
  },
  beforeRouteEnter(to, from, next) {
    const code = to.params.code;
    if (code !== undefined) {
      next(vm => {
        vm.errMsg = [];
        vm.code = code;
        try {
          vm.tokens = XLangLexer.run(code);
        } catch (err) {
          vm.handleError('词法分析失败:', err.message);
        }
      });
    } else {
      next();
    }
  }
};
</script>

<style></style>
