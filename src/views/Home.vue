<template>
  <div id="hero" class="d-flex justify-center align-center">
    <div class="text-center title">
      <p>XLang</p>
      <p style="font-size: 26px;">A Simple Programming Language</p>
      <p style="font-size: 26px;">
        Powered by
        <a
          style="color: #4f5959"
          href="https://github.com/yjl9903/XLex"
          target="_blank"
          rel="noopener"
          >XLex</a
        >
        and
        <a
          style="color: #4f5959"
          href="https://github.com/yjl9903/XParse"
          target="_blank"
          rel="noopener"
          >XParse</a
        >
      </p>
      <p>
        <router-link class="button white" to="/playground">体验</router-link>
        <a
          style="margin-left: 0.5em;"
          class="button white"
          href="https://xlang-docs.netlify.com"
          target="_blank"
          rel="noopener"
          >文档</a
        >
        <a
          style="margin-left: 0.5em;"
          class="button gray has-icon"
          href="https://github.com/yjl9903/XLang"
          target="_blank"
          rel="noopener"
        >
          <svg
            aria-labelledby="simpleicons-github-dark-icon"
            lang=""
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="simpleicons-github-dark-icon" lang="en">
              GitHub Dark icon
            </title>
            <path
              fill="#7F8C8D"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            ></path></svg
          >GITHUB</a
        >
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {}
};
</script>

<style scoped>
#hero {
  height: 100%;
  color: rgba(0, 0, 0, 0.7);
  background-image: linear-gradient(
    141deg,
    #159dc6 0,
    #3298dc 71%,
    #4389e5 100%
  );
  background-color: #3298dc;
  --hero-font-color: #3298dc;
}

#hero p {
  margin: 0;
}

#hero .title {
  color: white;
  font-size: 40px;
}

#hero .button {
  margin: 1em 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-width: 1em;
  text-align: center;
}
a.button.gray {
  background-color: #f6f6f6;
  color: #4f5959;
  border-color: #f6f6f6;
}
a.button.white {
  background-color: #fff;
  color: var(--hero-font-color);
}
a.button.has-icon {
  position: relative;
  text-indent: 1.4em;
}
a.button.has-icon > svg {
  position: absolute;
  left: 0.4em;
  top: 0.4em;
  width: 2em;
}
a.button {
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: var(--hero-font-color);
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid var(--hero-font-color);
}
</style>
