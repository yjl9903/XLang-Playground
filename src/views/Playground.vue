<template>
  <div class="playground">
    <el-row :gutter="10">
      <el-col :span="16">
        <el-tabs
          v-model="activeName"
          type="card"
          editable
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            :key="index"
            v-for="(item, index) in codes"
            :label="item.name"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col style="height: 100%">运行</el-col>
          <el-button
            type="success"
            icon="el-icon-caret-right"
            style="padding: 8px; font-size: 22px;"
            circle
          ></el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-if="mounted" :gutter="10">
      <el-col :span="16" style="height: 525px;">
        <Editor ref="editor" v-model="code"></Editor>
      </el-col>
      <el-col :span="8">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="运行参数" name="1">
            <div>
              设置运行参数
            </div>
          </el-collapse-item>
          <el-collapse-item title="标准输入" name="2">
            <div>
              标准输入流
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@/components/LazyEditor';
import { mapState } from 'vuex';

export default {
  name: 'Playground',
  components: {
    Editor
  },
  data() {
    return {
      mounted: false,
      code: this.$store.state.playground.codes[0].content,
      activeId: 0,
      activeName: this.$store.state.playground.codes[0].name,
      activeNames: ['1']
    };
  },
  watch: {
    code(nV, oV) {
      if (nV !== oV) {
        this.$store.commit('setCode', { id: this.activeId, content: nV });
      }
    },
    activeName(nV, oV) {
      if (nV !== oV) {
        const id = this.$store.getters.getCodeId(nV);
        this.code = this.$store.getters.getCode(id);
        this.activeId = id;
        this.$refs.editor.scrollTop();
      }
    }
  },
  computed: {
    ...mapState({
      codes: state => state.playground.codes
    })
  },
  methods: {
    handleTabsEdit(tagName, action) {
      if (action === 'add') {
        this.$store.commit('addCode');
        this.activeName = this.codes[this.codes.length - 1].name;
      } else if (action === 'remove') {
        if (this.codes.length === 1) {
          return;
        }
        if (this.activeName === tagName) {
          this.$store.commit('delCode', tagName);
          this.activeName = this.codes[0].name;
        } else {
          this.$store.commit('delCode', tagName);
        }
      }
    }
  },
  mounted() {
    this.mounted = true;
  }
};
</script>

<style>
.el-tabs__header.is-top {
  margin-bottom: 0 !important;
}
</style>
