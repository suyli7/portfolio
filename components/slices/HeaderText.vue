<style lang="scss" scoped>
  .cs__header-text{
    margin: $spacing-l 0;
    width: 100%;
    .header {
      margin: 0!important;
    }
    grid-template-columns: 1fr 2.5fr!important;
    align-items: flex-start;
  }
</style>
<template>
  <div class="cs__header-text grid-container">
    <Header>{{header}}</Header>
    <prismic-rich-text :field="text" class="text"/>
  </div>
</template>
<script>
export default {
  props: {
    header: String,
    text: Array,
  }
}
</script>