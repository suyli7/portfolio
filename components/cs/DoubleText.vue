<style lang="scss" scoped>
  .cs__double-text{
    column-gap: $spacing-xxl;
    @include tablet{
      row-gap: $spacing-l;
    }
  }
</style>
<template>
  <div class="cs__double-text cs__grid">
    <div>
      <CsHeader>{{header_left}}</CsHeader>
      <prismic-rich-text :field="text_left" class="text" />
    </div>
    <div>
      <CsHeader>{{header_right}}</CsHeader>
      <prismic-rich-text :field="text_right" class="text" />
    </div>
  </div>
</template>
<script setup>
  const props = defineProps([
    'header_left',
    'text_left',
    'header_right',
    'text_right'
  ])
</script>