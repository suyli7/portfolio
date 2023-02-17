<style lang="scss" scoped>
  .cs__text-row{
    margin: $spacing-l 0;
    &-content{
      font-size: $fs-l;
    }
    @include tablet{
      width: 100%;
    }
  }
</style>
<template>
  <div class="cs__text-row">
    <prismic-rich-text :field="text" class="cs__text-row-content"/>
  </div>
</template>
<script setup>
  const props = defineProps([
    'text'
  ])
</script>