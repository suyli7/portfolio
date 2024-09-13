<style lang="scss" scoped>
.cs-hero {
  margin-bottom: $spacing-xxl;
  h2 {
    font-size: $fs-m;
    line-height: 1.6;
  }
  .grid-container {
    column-gap: $spacing-xl;
    grid-template-columns: 1fr 2fr;
  }
  &-info{
    grid-template-columns: 1.5fr 1.5fr 1fr!important;
    column-gap: $spacing-l;
    div {
      font-size: $fs-xs;

      strong {
        display: block;
        margin-bottom: $spacing-xs;
      }
      margin-top: $spacing-l;
      margin-bottom: $spacing-xs;
    }
  }
  @include tablet {
    h1 {
      line-height: 1.2;
      font-size: $fs-l;
    }
  }
  @include mobile {
    h1 {
      margin-top: $spacing-s;
    }
    h2 {
      font-size: $fs-s;
    }
    &-info {
      grid-template-columns: 1fr!important;
      div {
        margin: $spacing-xs 0;
        strong {
          margin-bottom: $spacing-xxs;
        }
      }
    }
  }
}
</style>
<template>
  <Window class="cs-hero" :topBarText="`summary.docx`" width="100">
    <div class="grid-container">
      <prismic-image :field="cover" />
      <div>
        <h1 class="styled-title">{{ name }}</h1>
        <h2 class="text-body">{{ context }}</h2>
        <div class="cs-hero-line" />
        <div class="cs-hero-info grid-container">
          <div>
            <strong class="styled-text">key tech/tools</strong>
            <span v-for="t in tools.split(',')" :key="t.name" class="tag">
              {{t}}
            </span>
          </div>
          <div>
            <strong class="styled-text">my role</strong>
              {{ role }}
          </div>
          <div>
            <strong class="styled-text">timeframe</strong>
            {{ timeframe }}
          </div>
        </div>
      </div>
    </div>
  </Window>
</template>
<script>
export default {
  props: {
    cover: Array,
    name: String,
    context: String,
    role: String,
    timeframe: String,
    tools: String,
    tags: String
  },
}
</script>