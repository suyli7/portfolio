<style lang="scss" scoped>
  .cs__gridSlice{
    >.text{
      width: 60%;
    }
    .cs__grid{
      column-gap: $spacing-xxl;
      row-gap: $spacing-l;
      margin-top: $spacing-l;
      align-items: start;
    }
    &__item {
      b{
        display: block;
        margin-bottom: $spacing-xxs;
      }
      img{
        width: 100%;
      }
    }
    @include tablet{
      >.text{
        width:100%;
      }
      &__item img{
        margin-top: $spacing-xs;
      }
    }
  }
</style>
<template>
  <div class="cs__gridSlice">
    <CsHeader>{{header}}</CsHeader>
    <prismic-rich-text :field="content" class="text"/>
    <div class="cs__grid">
      <div
        class="cs__grid__item"
        v-for="(item, index) in items"
        :key="index"
      >
        <b>{{item.header}}</b>
        <p class="text">{{item.paragraph}}</p>
        <prismic-image :field="item.image" />
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps([
    'header',
    'content',
    'items'
  ])
</script>