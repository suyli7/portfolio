<template>
  <footer>
    <div>
      👩🏻‍💻 Built with Nuxt 3 * Prismic
      &copy; {{ currentYear }} Su Li
    </div>
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
    @include tablet {
      padding: $spacing-s $spacing-xl;
    }
    @include mobile {
      font-size: $fs-xs;
      padding: $spacing-s $spacing-m;
    }
  }
</style>
<script setup>
  const currentYear = ref(undefined);
  currentYear.value = new Date().getFullYear()
</script>