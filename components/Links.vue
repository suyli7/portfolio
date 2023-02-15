<template>
  <div class="links">
    <HeaderText size="med">
      {{ connectIntro }}
    </HeaderText>
    <div class="links__container">
      <a 
        v-for="item in connectLinks"
        :key="item.link_name"
        :href="item.link"
        target="_blank"
      >
        {{ item.link_name }} &#8599;
      </a>
    </div>
  </div>
</template>
<style lang="scss">
  .links {
    display: block;
    &__container {
      margin-top: $spacing-m;
      display: flex;
      flex-direction: column;
      a {
        margin-bottom: $spacing-s;
        font-size: $fs-s;
        width: max-content;
      }
    }
  }
</style>
<script setup>
  const props = defineProps(['connectIntro','connectLinks'])
</script>