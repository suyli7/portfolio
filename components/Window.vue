<template>
  <div class="window" :style="style">
    <BackgroundGradient class="window__top-bar">
      {{ topBarText }}
    </BackgroundGradient>
    <div class="window__content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      introData: this.$store.state.intro,
    }
  },
  computed: {
    style () {
      return {
        width: this.width ? this.width + '%' : 'auto',
        'vertical-align': this.alignTop ? 'top' : 'middle'
      }
    }
  },
  props: {
    topBarText: String,
    width: String || Number,
    alignTop: Boolean
  },
}
</script>
<style lang="scss" scoped>
  .window {
    box-sizing: border-box;
    border: $border;
    display: inline-block;
    height: fit-content;
  }
  .window__content{
    padding: $spacing-m;
  }
  .window__top-bar {
    padding: $spacing-xxs $spacing-m;
    font-family: $secFont;
    font-size: $fs-xxs;
    color: var(--text-strong-color);
    border-bottom: $border;
  }
</style>