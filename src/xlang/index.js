import { XLang } from '@yjl9903/xlang';
import store from '../store';

const runtime = new XLang();

runtime.addFn('println', 'voidType', ['stringType'], text => {
  store.commit('consolePrintln', text);
});

runtime.addFn('print', 'voidType', ['stringType'], text => {
  store.commit('consolePrint', text);
});

export function run(text, args = [], input = []) {
  const out = runtime.compile(text);
  if (out.ok) {
    runtime.run(out, args, input);
  }
}
