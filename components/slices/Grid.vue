<style lang="scss" scoped>
  .cs__grid{
    >.text{
      width: 60%;
    }
    .grid-container{
      column-gap: $spacing-xxl;
      row-gap: $spacing-l;
      margin-top: $spacing-l;
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
  <div class="cs__grid">
    <Header>{{header}}</Header>
    <prismic-rich-text :field="content" class="text"/>
    <div class="grid-container">
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
<script>
export default {
  props: {
    header: String,
    content: Array,
    items: Array
  }
}
</script>