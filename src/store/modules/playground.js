const CodeTemplate = 'fn main() {\n\t\n}';

function htmlEscape(text) {
  return text.replace(/[<>"& ]/g, match => {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '&':
        return '&amp;';
      case ' ':
        return '&nbsp;';
    }
  });
}

const state = {
  codes: [
    {
      name: '新的代码',
      content: CodeTemplate
    }
  ],
  console: []
};

const getters = {
  getCodeId: state => name =>
    state.codes.findIndex(value => value.name === name),
  getCode: state => id => {
    if (id === -1) {
      return CodeTemplate;
    } else {
      return state.codes[id].content;
    }
  }
};

const mutations = {
  addCode(state, { name = '新的代码', content = CodeTemplate } = {}) {
    const id = state.codes
      .filter(code => code.name.startsWith(name))
      .map(code => code.name.substr(name.length))
      .map(suffix => (suffix === '' ? 0 : parseInt(suffix)))
      .filter(num => !isNaN(num))
      .sort((a, b) => a - b)
      .reduce((pre, cur) => (cur === pre ? cur + 1 : pre), 0);
    state.codes.push({
      name: (name += id === 0 ? '' : ' ' + String(id)),
      content
    });
  },
  setCode(state, { id, content = undefined, name = undefined }) {
    if (id !== -1) {
      if (content !== undefined) {
        state.codes[id].content = content;
      }
      if (name !== undefined) {
        state.codes[id].name = name;
      }
    }
  },
  delCode({ codes }, name) {
    const id = codes.findIndex(value => value.name === name);
    if (id !== -1) {
      codes.splice(id, 1);
    }
  },
  consolePrintln(state, text) {
    text.text = htmlEscape(text.text);
    // console.log(text.text);
    state.console.push([text]);
  },
  consolePrint(state, text) {
    if (state.console.length === 0) {
      state.console = [[]];
    }
    text.text = htmlEscape(text.text);
    state.console[state.console.length - 1].push(text);
  },
  consoleClear(state) {
    state.console = [];
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
