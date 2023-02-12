<template>
  <div class="games">
    <prismic-rich-text
      v-if="gamesData"
      class="games__header"
      :field="gamesData.data.games_intro"
    />
  </div>
</template>
<style lang="scss">
  .games__header {
    font-size: $fs-m;
  }
</style>
<script setup>
  const { client } = usePrismic();
  const { data: gamesData } = await useAsyncData('gamesData', () => client.getSingle('games'));
</script>