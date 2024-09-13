<template>
  <div :class="classname" :style="style">
    <slot />
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
        "grid-template-columns": this.colTemplate,
        "grid-template-rows": this.rowTemplate,
        "column-gap": this.colGap || "calc(100vw*0.02)",
        "row-gap": this.rowGap || "calc(100vw*0.02)"
      }
    },
    classname () {
      return this.col ? 'window-cluster window-cluster-col' : 'window-cluster window-cluster-row'
    }
  },
  props: {
    width: String || Number,
    colTemplate: String,
    rowTemplate: String,
    colGap: String,
    rowGap: String
  },
}
</script>
<style lang="scss" scoped>
  .window-cluster {
    display: grid;
    @include tablet {
      grid-template-columns: 1fr !important;
      row-gap: $spacing-s!important;
    }
  }
</style>