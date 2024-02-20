<template>
  <div class="block">
    <slot />
  </div>
</template>
<style lang="scss">
  .block {
    background-color: var(--button-color);
    box-sizing: border-box;
    border: $border;
    position: relative;
    width: calc(100% - 0.8rem);
    padding: $spacing-s;
    &::after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-bottom: $border;
      border-right: $border;
      bottom: -0.8rem;
      right: -0.8rem;
      pointer-events: none;
    }
  }
</style>