<template>
  <div class="loading-screen" :style="`opacity: ${removeLoadScreen ? 0 : 1}`"/>
</template>
<style lang="scss" scoped>
  .loading-screen {
    z-index: 100;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fdfdfd;
    position: fixed!important;
    transition: opacity 0.4s;
    pointer-events: none;
    opacity: 1;
  }
</style>
<script>
  export default {
    props: {
      removeLoadScreen: Boolean
    }
  }
</script>
