<style lang="scss" scoped>
  .cs__single-text{
    img{
      width: 100%;
      margin-top: $spacing-s;
    }
    @include tablet{
      div{
        width: 100%;
      }
    }
  }
</style>
<template>
  <div class="cs__single-text">
    <div>
      <CsHeader>{{header}}</CsHeader>
      <prismic-rich-text :field="text" class="text"/>
    </div>
    <prismic-image 
      v-for="(item, key) in items"
      :key="'img'+key"
      :field="item.image"
    />
  </div>
</template>
<script setup>
  const props = defineProps([
    'header',
    'text',
    'items'
  ])
</script>