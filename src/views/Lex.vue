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
        <LexStream @run="run" :tokens="tokens" />
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
    tokens: []
  }),
  methods: {
    run() {
      const lexer = this.$refs.config.getLexer();
      this.tokens = lexer.run(this.code);
    }
  },
  mounted() {
    this.mounted = true;
  },
  beforeRouteEnter(to, from, next) {
    const code = to.params.code;
    if (code !== undefined) {
      next(vm => {
        vm.code = code;
        vm.tokens = XLangLexer.run(code);
      });
    } else {
      next();
    }
  }
};
</script>

<style></style>
