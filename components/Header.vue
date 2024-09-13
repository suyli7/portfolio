<template>
  <div class="header">
    <div v-if="withIcon" class="icon-folder"/>
    <span class="styled-text">
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  props: {
    withIcon: {
      default: false,
      type: Boolean
    }
  }
}
</script>
<style lang="scss" scoped>
  .icon-folder {
    display: inline-block;
    margin-right: $spacing-xs;
  }
  .header{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: $spacing-xl 0 $spacing-s 0;
    max-width: 100%;
    span {
      font-size: $fs-l;
      @include mobile {
        line-height: 1.6;
        font-size: $fs-m;
        max-width: 100%;
        overflow-wrap: break-word;
      }
    }
  }
</style>