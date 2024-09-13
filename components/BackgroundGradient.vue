<template>
  <div class="background-gradient">
    <div class="background-gradient__gradient" />
    <slot />
  </div>
</template>
<style lang="scss" scoped>
  .background-gradient{
    position: relative;
  }
  .background-gradient__gradient {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: var(--text-strong-color);
    background: linear-gradient(130deg, var(--gradient-one) 0%, var(--gradient-two) 100%);
  }
</style>