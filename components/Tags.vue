<template>
  <div class="tags">
    <div
      class="tag"
      v-for="(t,i) in tags"
      v-bind:key="`tagItem${i}-t`"
    >
      {{ t }}
    </div>
  </div>
</template>
<style lang="scss">
  .tags {
    margin: $spacing-xxs 0;
    opacity: 0.8;
  }
  .tag {
    border: $border;
    color: var(--text-color-strong);
    display: inline-block;
    padding: $spacing-xxs * 0.5 $spacing-xxs;
    font-size: $fs-xxs;
    font-weight: $fw-m;
    margin: 0 $spacing-xxs $spacing-xxs 0;
  }
</style>
<script setup>
  const props = defineProps([
    'tags'
  ]);
</script>