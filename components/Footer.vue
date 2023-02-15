<template>
  <footer>
    <div>👩🏻‍💻 Built with Nuxt 3 + Prismic</div>
    <div>&copy; {{ currentYear }} Su Li</div>
  </footer>
</template>
<style lang="scss">
  footer {
    margin-top: $spacing-xl;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: $spacing-s $spacing-xxl;
    font-weight: $fw-m;
    font-size: $fs-xs;
    color: var(--text-color-strong);
    > div:first-of-type {
      margin-right: $spacing-xs;
    }
    @include tablet {
      padding: $spacing-s $spacing-xl;
    }
    @include mobile {
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      > div:first-of-type {
        margin: 0;
      }
      font-size: $fs-xs;
      padding: $spacing-s $spacing-m;
    }
  }
</style>
<script setup>
  const currentYear = ref(undefined);
  currentYear.value = new Date().getFullYear()
</script>