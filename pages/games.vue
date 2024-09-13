<template>
  <section class="games main">
    <Window topBarText="games_recommendation.txt" alignTop>
      <prismic-rich-text :field="games_intro" class="text"/>
    </Window>
    <div class="divider" />
    <Window :topBarText="`~/games/${selectedGameName}`" width="100">
      <div class="games-container">
        <div
          class="game-item"
          v-for="(game, index) in games"
          v-bind:class="{ selected: index === selectedIndex }"
          :key="game.name"
          @click="setSelectedGame(index)"
        >
          <prismic-image 
            :field="game.icon"
          />
        </div>
      </div>
    </Window>
  </section>
</template>
<script>
export default {
  transition (to, from) {},
  data() {
    return {
      selectedIndex: 0,
      selectedGameName: '',
      games: this.$store.state.games.games,
      games_intro: this.$store.state.games.games_intro
    }
  },
  methods: {
    setSelectedGame: function (index) {
      this.selectedIndex = index;
      this.selectedGameName = this.games[index].name;
    }
  }
}
</script>
<style lang="scss" scoped>
  .games-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr)!important;
    column-gap: $spacing-l;
    row-gap: $spacing-l;
    @include tablet {
      grid-template-columns: repeat(6, 1fr)!important;
      row-gap: $spacing-m;
      column-gap: $spacing-l;
    }
    @include mobile {
      grid-template-columns: repeat(3, 1fr)!important;
      column-gap: $spacing-m;
    }
  }
  .game-item {
    font-family: $secFont;
    font-size: $fs-xxs;
    display: flex;
    flex-direction: column;
    outline: 0px;
    padding: $spacing-xxs;
    &:hover, &.selected{
      outline: 2px solid var(--border-color);
    }
    *{
      cursor: var(--cursor-pointer);
    }
    span {
      line-height: 1.4;
      margin-top: $spacing-s;
      text-align: center;
    }
  }
</style>