<style lang="scss" scoped>
  .cs__double-text{
    column-gap: $spacing-xxl;
    @include tablet{
      row-gap: $spacing-l;
    }
  }
</style>
<template>
  <div class="cs__double-text grid-container">
    <div>
      <Header>{{header_left}}</Header>
      <prismic-rich-text :field="text_left" class="text" />
    </div>
    <div>
      <Header>{{header_right}}</Header>
      <prismic-rich-text :field="text_right" class="text" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    header_left: String,
    text_left: Array,
    header_right: String,
    text_right: Array,
  }
}
</script>