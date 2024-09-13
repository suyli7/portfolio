<style lang="scss" scoped>
  .cs__tri-grid{
    @extend .grid-container;
    grid-template-columns: 1.5fr 1.5fr 1fr;
    column-gap: $spacing-xl;
    align-items: end;
    img{
      width: 100%;
    }
    @include tablet{
      > img:first-of-type{
        margin-bottom: $spacing-s;
      }
      > img:last-of-type{
        margin-top: $spacing-s;
      }
    }
  }
</style>
<template>
  <div class="cs__tri-grid">
    <prismic-image :field="image_left"/>
    <div>
      <Header>{{header}}</Header>
      <prismic-rich-text :field="text" class="text"/>
    </div>
    <prismic-image :field="image_right"/>
  </div>
</template>
<script>
export default {
  props: {
    header: String,
    text: Array,
    image_left: Object,
    image_right: Object,
  }
}
</script>