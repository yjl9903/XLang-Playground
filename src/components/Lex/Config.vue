<template>
  <div>
    <p
      class="d-flex align-center justify-space-between"
      style="height: 40px; line-height: 40px; width: 100%; margin: 0; border-bottom: 1px solid rgb(235, 238, 245);"
    >
      <span>配置</span>
      <el-tooltip content="导入 XLang 词法配置" placement="top">
        <el-button
          type="success"
          style="padding: 7px; font-size: 22px;"
          icon="el-icon-plus"
          circle
          @click="importXLang"
        ></el-button>
      </el-tooltip>
    </p>
    <div style="max-height: 475px; padding: 0px 5px; overflow-x: auto;">
      <el-row
        type="flex"
        align="middle"
        :gutter="10"
        v-for="(item, index) in rules"
        :key="index"
        style="margin-top: 10px;"
      >
        <el-col :span="24">
          <el-card>
            <div class="d-flex align-center justify-space-between">
              <span style="height: 100%; line-height: 100%">类型</span>
              <el-input
                v-model="rules[index].type"
                size="small"
                style="width: calc(100% - 3em);"
                :tabindex="String(2 * index - 1)"
                :maxlength="10"
                :placeholder="item.type"
              ></el-input>
            </div>
            <div
              style="margin-top: 5px;"
              class="d-flex align-center justify-space-between"
            >
              <span>规则</span>
              <el-input
                v-model="rules[index].rule"
                size="small"
                style="width: calc(100% - 3em);"
                :tabindex="String(2 * index)"
                :placeholder="item.rule"
              ></el-input>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row
      type="flex"
      justify="space-between"
      :gutter="10"
      style="margin-top: 10px; padding-bottom: 24px;"
    >
      <el-col :span="19">
        <el-button
          type="primary"
          size="small"
          style="width: 100%;"
          @click="rules.push({ rule: '', type: '' })"
          >添加配置</el-button
        >
      </el-col>
      <el-col :span="5">
        <el-button type="danger" size="small" @click="rules = []"
          >清空</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { LexConfig, XLangLexer } from '../../xlang';
import { Lexer } from 'xlex';

export default {
  name: 'Lex-Config',
  data: () => ({
    rules: LexConfig.tokens,
    preRule: [],
    lexer: null
  }),
  methods: {
    importXLang() {
      this.rules = LexConfig.tokens;
    },
    getLexer() {
      if (this.rules === LexConfig.tokens) {
        return XLangLexer;
      }
      const rule = this.rules.filter(
        rule => rule.type !== '' && rule.rule !== ''
      );
      let isBuild = false;
      if (rule.length === this.preRule.length) {
        for (let i = 0; i < rule.length; i++) {
          if (
            rule[i].type !== this.preRule[i].type ||
            rule[i].rule !== this.preRule[i].rule
          ) {
            isBuild = true;
            break;
          }
        }
      } else {
        isBuild = true;
      }
      const lexer = isBuild ? new Lexer({ tokens: rule }) : this.lexer;
      this.preRule = rule;
      this.lexer = lexer;
      return lexer;
    }
  }
};
</script>

<style></style>
