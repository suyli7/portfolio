<template>
  <div
    :class="['headerText', size]"
  >
    <slot />
  </div>
</template>
<style lang="scss">
  .headerText {
    font-size: $fs-xl;
    color: var(--text-color-strong);
    &.small {
      font-size: $fs-m;
    }
    &.med {
      font-size: $fs-l;
    }
  }
</style>
<script setup>
  const props = defineProps(['size']);
</script>
