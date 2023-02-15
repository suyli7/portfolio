<template>
  <div class="facts">
    <HeaderText size="med">
      A little more about me
    </HeaderText>
    <div
      v-if="facts"
      class="facts__container"
    >
      <Block
        v-for="(f, index) in facts"
        v-bind:key="`factItem-${index}`"
      >
        <div>{{ getEmoji(f.text) }}</div>
        <div>{{ getText(f.text) }}</div>
      </Block>
    </div>
  </div>
</template>
<style lang="scss">
  .facts {
    margin-top: $spacing-xxl;
    @include tablet {
      margin-top: $spacing-xl;
    }
    &__intro {
      font-size: $fs-l;
      @include mobile {
        font-size: $fs-m;
      }
    }
    &__container {
      margin-top: $spacing-m;
      display: grid;
      column-gap: $spacing-l;
      row-gap: $spacing-xl;
      grid-template-columns: repeat(4, 1fr);
      .block {
        font-weight: $fw-m;
        > div:first-of-type {
          font-size: $fs-m;
        }
        > div:last-of-type {
          font-size: $fs-xs;
        }
      }
      @include smallScreen {
        grid-template-columns: repeat(3, 1fr);
      }
      @include tablet {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
<script setup>
  const props = defineProps(['facts']);
  const emojiRE = /[\p{Emoji}\u200d]+/gu;

  function getText(text) {
    return text.replace(emojiRE, '');
  }

  function getEmoji(text) {
    return text.match(emojiRE)[0];
  }
</script>
