<script>
export default {
  name: 'HandleError',
  data: () => ({}),
  created() {
    if (this.$route.name !== 'Home') {
      this.$router.replace({ name: 'Home' });
    }
  }
};
</script>
