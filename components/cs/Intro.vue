<template>
  <div class="caseStudyIntro">
    <div>
      <prismic-image :field="cover"/>
        <div class="caseStudyIntro__itemsContainer">
          <div class="caseStudyIntro__item">
          <strong>Timeframe</strong>
          <div>{{ timeframe }}</div>
        </div>
        <div class="caseStudyIntro__item">
          <strong>My role</strong>
          <Tags :tags="role.split(', ')"/>
        </div>
        <div class="caseStudyIntro__item">
          <strong>Key tech</strong>
          <Tags :tags="tools.split(', ')"/>
        </div>
      </div>
    </div>
    <div>
      <h1>{{ name }}</h1>
      <h2>{{ context }}</h2>
      <button v-if="website.url">
        visit live site
      </button>
    </div>
  </div>
</template>
<style lang="scss">
  .caseStudyIntro {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: $spacing-xxl;
    margin: 0 auto;
    width: 90%;
    max-width: 1400px;
    img {
      width: 100%;
    }
    h1 {
      font-size: $fs-xxl;
    }
    h2 {
      font-size: $fs-m;
      font-weight: $fw-r;
    }
    strong, h2 {
      color: var(--text-color);
    }
    button {
      margin-top: $spacing-s;
    }
    > div:last-of-type {
      margin-top: $spacing-xxl;
    }
    &__itemsContainer{
      margin-top: $spacing-m;
      display: grid;
      grid-template-columns: 1fr 2fr 2fr;
      column-gap: $spacing-s;
    }
    &__item {
      margin-top: $spacing-xs;
      > div {
        color: var(--text-color-strong);
      }
    }
    @include tablet {
      grid-template-columns: 1fr;
      row-gap: $spacing-l;
      width: 100%;
      h1 {
      font-size: $fs-xl;
      }
      h2 {
        font-size: $fs-s;
        font-weight: $fw-r;
      }
      > div:first-of-type {
        order: 2;
      }
      > div:last-of-type {
        order: 1;
        margin-top: 0;
      }
      &__itemsContainer{
        margin-top: $spacing-m;
        grid-template-columns: 1fr;
        row-gap: $spacing-xxs;
      }
    }
  }
</style>
<script setup>
  const props = defineProps([
    'name',
    'context',
    'role',
    'tools',
    'cover',
    'timeframe',
    'website'
  ])
</script>