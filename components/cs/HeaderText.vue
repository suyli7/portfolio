<style lang="scss" scoped>
  .cs__headerText.cs__grid{
    width: 75%;
    grid-template-columns: 1fr 2.5fr;
    @include tablet {
      grid-template-columns: 1fr!important;
    }
  }
</style>
<template>
  <div class="cs__headerText cs__grid">
    <CsHeader>{{ header }}</CsHeader>
    <prismic-rich-text :field="text" class="text"/>
  </div>
</template>
<script setup>
  const props = defineProps([
    'header',
    'text',
  ])
</script>