
<template>
   <div class="case-studies" v-if="data">
    <div class="case-studies__container">
        <Window
          v-for="(item, index) in data"
          :key="item.name"
          :topBarText="`project_${index+1}.docx`"
        >
          <prismic-image
            class="case-studies__image"
            :field="item.cover"
          />
          <div class="case-study__info">
              <h2 class="styled-text">{{item.name}}</h2>
              <h3>{{item.context}}</h3>
              <nuxt-link
                v-if="item.is_case_study"
                class="button"
                :to="'/casestudies/' + item.ref"
              >
                read more
              </nuxt-link>
              <prismic-link
                v-if="!item.is_case_study || item.website.url"
                class="button visit"
                v-bind:class="{ spaced: item.is_case_study }"
                target="_blank"
                :field="item.website"
              >
                visit site &#8599;
              </prismic-link>
          </div>
        </Window>
      </div>
  </div>
  <div v-else>
    Working hard to display my work...
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: this.$store.state.caseStudies
    }
  }
}
</script>
<style lang="scss" scoped>
  .case-studies{
    margin-top: $spacing-xl;
    img {
      width: 100%;
    }
    .button.spaced {
      margin-left: $spacing-xs;
    }
    .case-studies__image {
      max-height: 40vh;
      object-fit: cover;
    }
    .case-studies__container{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: $spacing-xl;
      row-gap: $spacing-xl;
      .window {
        height: auto;
        ::v-deep h2 {
          margin: $spacing-xxs 0;
        }
        ::v-deep h3 {
          font-size: $fs-xs;
          font-weight: $fw-r;
          margin-bottom: $spacing-xs;
        }
      }
      @include mobile {
        grid-template-columns: repeat(1, 1fr);
        .button {
          text-align: center;
          display: block;
          &.visit {
            margin-top: $spacing-xs;
            margin-left: 0;
          }
        }
      }
    }
  }
</style>