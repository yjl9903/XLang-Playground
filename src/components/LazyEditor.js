import Loading from './Loading.vue';

const LazyEditor = () => ({
  component: import('./Editor.vue'),
  loading: Loading,
  error: Loading,
  delay: 1000,
  timeout: 5000
});

export default LazyEditor;
