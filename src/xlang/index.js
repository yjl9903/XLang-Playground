import { XLang, LexConfig, XLangLexer, XLangParser } from '@yjl9903/xlang';
import store from '../store';

export { LexConfig, XLangLexer, XLangParser };

let runtime = undefined;

function initRuntime() {
  if (runtime === undefined) {
    return new Promise(res => {
      runtime = new XLang();
      runtime.addFn('println', 'voidType', ['stringType'], text => {
        store.commit('consolePrintln', { text });
      });
      runtime.addFn('print', 'voidType', ['stringType'], text => {
        store.commit('consolePrint', { text });
      });
      res();
    });
  }
}

export async function compile(text) {
  await initRuntime();
  try {
    const out = runtime.compile(text);
    return out.ok;
  } catch (err) {
    return false;
  }
}

export async function run(text, args = [], input = []) {
  await initRuntime();
  store.commit('consoleClear');
  store.commit('consolePrintln', { text: '开始编译...', color: '#67C23A' });
  const st = new Date();
  try {
    const out = runtime.compile(text);
    if (out.ok) {
      store.commit('consolePrintln', {
        text: '编译成功, 开始运行...',
        color: '#67C23A'
      });
      store.commit('consolePrintln', { text: '' });
      try {
        runtime.run(out, args, input);
        const ed = new Date();
        store.commit('consolePrintln', {
          text: `运行完成, 时间: ${ed - st}ms.`,
          color: '#67C23A'
        });
      } catch (err) {
        store.commit('consolePrintln', {
          text: '运行时错误:',
          color: '#F56C6C'
        });
        store.commit('consolePrintln', { text: err.message, color: '#F56C6C' });
      }
    } else {
      if (out.message) {
        if (out.message.startsWith('XLex Error: ')) {
          store.commit('consolePrintln', {
            text: `词法分析失败:`,
            color: '#F56C6C'
          });
          const [
            flag,
            message,
            row,
            col
          ] = /^XLex Error: ([\w\W]+), at Row (\d+) Col (\d+).$/.exec(
            out.message
          );
          if (flag === out.message) {
            store.commit('consolePrintln', {
              text: `${message}, 位于第 ${parseInt(row) + 1} 行, 第 ${parseInt(
                col
              ) + 1} 列.`,
              color: '#F56C6C'
            });
          } else {
            store.commit('consolePrintln', {
              text: out.message,
              color: '#F56C6C'
            });
          }
        } else {
          store.commit('consolePrintln', {
            text: `编译失败:`,
            color: '#F56C6C'
          });
          store.commit('consolePrintln', {
            text: out.message,
            color: '#F56C6C'
          });
        }
      } else if (out.token) {
        store.commit('consolePrintln', {
          text: `语法分析失败:`,
          color: '#F56C6C'
        });
        store.commit('consolePrintln', {
          text: `当前 Token 为 "${out.token.value}", 位于第 ${out.token.position
            .row + 1} 行, 第 ${out.token.position.col + 1} 列.`,
          color: '#F56C6C'
        });
      }
    }
  } catch (err) {
    store.commit('consolePrintln', { text: `编译失败:`, color: '#F56C6C' });
    store.commit('consolePrintln', { text: err.message, color: '#F56C6C' });
  }
}
