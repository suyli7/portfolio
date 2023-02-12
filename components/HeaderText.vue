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
    @include mobile {
      font-size: $fs-l;
    }
    &.small {
      font-size: $fs-m;
      @include mobile {
        font-size: $fs-s;
      }
    }
    &.med {
      font-size: $fs-l;
      @include mobile {
        font-size: $fs-m;
      }
    }
  }
</style>
<script setup>
  const props = defineProps(['size']);
</script>
