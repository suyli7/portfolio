<template>
  <div class="story">
    <HeaderText size="med">
      My story
    </HeaderText>
    <div class="story__content">
      <div>
        <prismic-image :field="profile" lazy/>
      </div>
      <prismic-rich-text
      class="story__text"
      :field="story"
      />
    </div>
  </div>
</template>
<style lang="scss">
  .story {
    margin-bottom: $spacing-xs;
    img {
      max-width: 100%;
      position: relative;
      border-radius: 50%;
    }
    &__content {
      margin-top: $spacing-m;
      display: grid;
      grid-template-columns: 1fr 4fr;
      column-gap: $spacing-xl;
    }
    &__text {
      p {
        font-size: $fs-xs;
      }
    }
    @include tablet {
      img {
        width: 50%;
        margin-bottom: $spacing-xs;
        max-width: 120px;
      }
      &__content {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
<script setup>
  const props = defineProps(['story', 'profile'])
</script>