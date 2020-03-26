<template>
  <div class="playground" style="padding-bottom: 24px;">
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
          <el-col style="height: 100%">面板</el-col>
          <el-tooltip content="展开终端" placement="top">
            <el-button
              icon="el-icon-caret-top"
              style="padding: 7px; font-size: 22px;"
              circle
              @click="drawer = true"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="运行" placement="top">
            <el-button
              type="success"
              icon="el-icon-caret-right"
              style="padding: 7px; font-size: 22px;"
              circle
              @click="run"
            ></el-button>
          </el-tooltip>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-if="mounted" :gutter="10">
      <el-col :span="16" style="min-height: 525px; height: 525px;">
        <Editor ref="editor" v-model="code"></Editor>
      </el-col>
      <el-col :span="8">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="文件" name="0">
            <PlaygroundFile
              :fileName="activeName"
              @addExample="handleAddExample"
              @rename="handleRename"
            />
          </el-collapse-item>
          <el-collapse-item title="运行参数" name="1">
            <PlaygroundParams ref="params" />
          </el-collapse-item>
          <el-collapse-item title="标准输入" name="2">
            <PlaygroundIn ref="in" />
          </el-collapse-item>
        </el-collapse>
        <PlaygroundConsole style="margin-top: 10px" />
      </el-col>
    </el-row>
    <el-drawer
      style="outline: none;"
      :visible.sync="drawer"
      :with-header="false"
      :modal="false"
      size="400px;"
      direction="btt"
    >
      <PlaygroundConsole
        style="border: none; box-shadow: none; max-height: 400px; overflow-y: auto;"
      />
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Editor from '@/components/LazyEditor';
import PlaygroundFile from '@/components/Playground/File.vue';
import PlaygroundParams from '@/components/Playground/Params.vue';
import PlaygroundIn from '@/components/Playground/In.vue';
import PlaygroundConsole from '@/components/Playground/Console.vue';
import { run } from '../xlang';

export default {
  name: 'Playground',
  components: {
    Editor,
    PlaygroundFile,
    PlaygroundParams,
    PlaygroundIn,
    PlaygroundConsole
  },
  data() {
    return {
      drawer: false,
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
    run() {
      if (this.activeNames.includes('1')) {
        this.activeNames = ['1'];
      } else {
        this.activeNames = [];
      }
      const input = this.$refs.in.value
        .split('\n')
        .map(row =>
          row
            .trim()
            .split(' ')
            .filter(s => s.length > 0)
        )
        .reduce((pre, cur) => (pre.push(...cur), pre), []);
      run(this.code, this.$refs.params.params, input);
    },
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
    },
    handleAddExample(item) {
      this.$store.commit('addCode', item);
      this.activeName = this.codes[this.codes.length - 1].name;
    },
    handleRename(name) {
      this.$store.commit('setCode', { id: this.activeId, name });
      this.activeName = name;
    }
  },
  mounted() {
    this.mounted = true;
  }
};
</script>
