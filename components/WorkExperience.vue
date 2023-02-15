<template>
  <div class="workExperience">
    <HeaderText size="med">
      Work experience
    </HeaderText>
    <div class="workExperience__container">
      <Block
        v-for="(exp, index) in workExpData"
        v-bind:key="`workExp-${index}`"
      >
        <div class="expItem__duration">{{exp.duration}}</div>
        <div class="expItem__org">{{exp.org}}</div>
        <div class="expItem__role">{{exp.role}}</div>
        <Tags
          :tags="exp.key_tech.split(',')"
        />
        <prismic-rich-text
          class="expItem__description"
          :field="exp.description"
        />
      </Block>
    </div>
  </div>
</template>
<style lang="scss">
  .workExperience {
    margin-top: $spacing-xxl;
    &__container {
      margin-top: $spacing-m;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: $spacing-l;
      row-gap: $spacing-xl;
    }
    @include tablet {
      margin-top: $spacing-l;
      &__container {
        grid-template-columns: 1fr;
      }
    }
  }
  .expItem {
    &__duration {
      display: inline-block;
      background-color: var(--text-color);
      color: var(--text-color-dark);
      padding: 0 $spacing-xxs;
      font-size: $fs-xxs;
      font-weight: $fw-m;
      text-transform: uppercase;
    }
    &__org {
      font-size: $fs-m;
      font-weight: $fw-b;
      margin: $spacing-xxs 0;
    }
    &__role {
      font-size: $fs-s;
    }
    &__description {
      margin-top: $spacing-s;
      p {
        margin: 0;
      }
      @include mobile {
        margin-top: $spacing-xxs;
      }
    }
  }
</style>
<script setup>
  const props = defineProps(['workExpData'])
</script>