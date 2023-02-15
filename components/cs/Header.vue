<template>
  <div class="caseStudy__Header">
    <div v-if="withIcon" class="icon-folder"/>
      <slot />
  </div>
</template>
<script setup>
  const props = defineProps([
    'withIcon'
  ])
</script>
<style lang="scss" scoped>
  .icon-folder {
    display: inline-block;
    margin-right: $spacing-xs;
  }
  .caseStudy__Header{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 $spacing-s 0;
    max-width: 100%;
    color: var(--text-color-strong);
    font-weight: $fw-b;
    font-size: $fs-l;
    line-height: 1.6;
    max-width: 100%;
    overflow-wrap: break-word; 
    text-transform:capitalize;
  }
</style>