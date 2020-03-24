import Loading from './Loading.vue';
import Error from './Error.vue';

const LazyEditor = () => ({
  component: import('./Editor.vue'),
  loading: Loading,
  error: Error,
  delay: 50
});

export default LazyEditor;
