<template>
  <div>
    <LoadingScreen :removeLoadScreen="removeLoadScreen"/>
    <Nav />
    <Nuxt />
  </div>
</template>
<script>
  export default {
    name: 'default',
    data() {
      return {
        removeLoadScreen: false,
      }
    },
    head() {
      return {
        bodyAttrs: {
          class: 'default-layout',
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.checkIsLoading();
      })
    },
    methods: {
      checkIsLoading: function() {
        if (
          this.$store.state.isDoneFetching
          && this.$store.state.caseStudies.length
        ){
          document.documentElement.style.overflow = 'auto';
          document.getElementsByClassName('main')[0].style.opacity = 1;
          setTimeout(() => {
            this.removeLoadScreen = true;
          }, 200);
        } else {
          this.checkIsLoading();
        }
      }
    }
  }
</script>
<style lang="scss">
  body.default-layout{
    background: var(--background-color);
  }
</style>