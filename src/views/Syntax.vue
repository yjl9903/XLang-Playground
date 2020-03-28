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
        <p
          class="d-flex align-center justify-space-between"
          style="height: 40px; line-height: 40px; width: 100%; margin: 0; border-bottom: 1px solid rgb(235, 238, 245);"
        >
          <span class="d-inline-block"
            >语法
            <i
              class="el-icon-check"
              v-if="resFlag === true"
              style="color: #67C23A; font-weight: bold;"
            ></i>
            <i
              v-else-if="resFlag === false"
              class="el-icon-close"
              style="color: #F56C6C; font-weight: bold;"
            ></i
          ></span>
          <el-tooltip content="语法解析" placement="top">
            <el-button
              type="success"
              style="padding: 7px; font-size: 22px;"
              icon="el-icon-caret-right"
              @click="run"
              circle
            ></el-button>
          </el-tooltip>
        </p>
        <div>
          <p style="margin: 10px 0;">
            语法解析:
            <el-switch
              v-model="isXLang"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="XLang"
              inactive-text="自定义"
            >
            </el-switch>
          </p>
          <p style="margin: 10px 0;">
            词法解析:
            <el-switch
              v-model="isLex"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
            >
            </el-switch>
          </p>
          <p style="margin: 10px 0;">
            起始非终结符:
            <el-input
              v-model="start"
              style="width: calc(100% - 8.3em)"
            ></el-input>
          </p>
          <div style="max-height: 360px; overflow-x: auto;">
            <el-row
              type="flex"
              v-for="(item, index) in prods"
              :key="index"
              style="padding: 0 1px; margin-bottom: 10px;"
            >
              <el-input
                v-model="prods[index]"
                :tabindex="String(index)"
                :placeholder="item"
              ></el-input>
            </el-row>
          </div>
          <el-row
            type="flex"
            :gutter="10"
            style="margin-top: 10px; padding-bottom: 24px;"
          >
            <el-col :span="19">
              <el-button
                type="primary"
                size="small"
                style="width: 100%;"
                @click="prods.push('')"
                >添加产生式</el-button
              >
            </el-col>
            <el-col :span="5">
              <el-button type="danger" size="small" @click="prods = ['']"
                >清空</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6"><LexConfig ref="config"/></el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@/components/LazyEditor';
import LexConfig from '@/components/Lex/Config.vue';
import { compile } from '../xlang';
import { LRParser } from '@yjl9903/xparse';

function parseConfig(start, prodsText) {
  start = start.trim();
  prodsText = prodsText.filter(s => s.trim().length > 0);
  const types = new Set();
  const allS = [];
  const productions = prodsText.map(text => {
    const lr = text.split('->');
    if (lr.length != 2) {
      throw new Error('miss "->"');
    }
    const lhs = lr[0].trim();
    const rhs = lr[1]
      .trim()
      .split(' ')
      .filter(s => s.trim().length > 0);
    types.add(lhs);
    for (const item of rhs) {
      allS.push(item);
    }
    return {
      left: lhs,
      right: [
        {
          rule: rhs
        }
      ]
    };
  });
  return {
    tokens: allS.filter(s => !types.has(s)),
    types: [...types],
    start,
    productions
  };
}

export default {
  name: 'Syntax',
  components: {
    Editor,
    LexConfig
  },
  data: () => ({
    mounted: false,
    isXLang: false,
    isLex: false,
    start: '',
    code: '',
    prods: [''],
    resFlag: null
  }),
  watch: {
    isXLang(nV) {
      if (nV) {
        this.isLex = true;
      }
    }
  },
  methods: {
    async run() {
      this.resFlag = null;
      if (this.isXLang) {
        this.resFlag = await compile(this.code);
      } else {
        const tokenStream = function*() {
          if (this.isLex) {
            yield* this.$refs.config.getLexer().run(this.code);
          } else {
            for (const c of this.code) {
              yield { type: c, value: c };
            }
          }
        }.bind(this);
        try {
          const config = parseConfig(this.start, this.prods);
          const parser = new LRParser(config);
          const res = parser.parse(tokenStream());
          this.resFlag = res.ok;
        } catch (err) {
          console.error(err);
          this.resFlag = false;
        }
      }
    }
  },
  mounted() {
    this.mounted = true;
  }
};
</script>

<style></style>
