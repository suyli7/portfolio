<style lang="scss" scoped>
  .cs__tri-grid{
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 1fr;
    column-gap: $spacing-xl;
    align-items: end;
    img{
      width: 100%;
    }
    @include tablet{
      grid-template-columns: 1fr;
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
      <CsHeader>{{header}}</CsHeader>
      <prismic-rich-text :field="text" class="text"/>
    </div>
    <prismic-image :field="image_right"/>
  </div>
</template>
<script setup>
  const props = defineProps([
    'header',
    'text',
    'image_left',
    'image_right'
  ])
</script>