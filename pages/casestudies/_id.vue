<style lang="scss" scoped>
  .cs{
    .wrapper{
      @include tablet{
        overflow-x: hidden;
      }
    }
  }
  .cs__footer{
    margin-top: $spacing-xl;
    &-container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
    .styled-text {
      font-size: $fs-l;
    }
    .button {
      margin-top: $spacing-s;
      display: inline-block;
    }
    &-content {
      flex: 1;
      display: inline-block;
      margin-left: $spacing-xl;
    }
    img{
      max-height: 30vh;
    }
    @include mobile {
      width: 100%!important;
      &-container {
        flex-direction: column;
      }
      &-content {
        margin-left: 0;
      }
    }
  }
</style>
<template>
  <section class="case-studies cs main" v-if="cs_data">
      <CaseStudiesHero
        v-bind="cs_data"
      />
      <CaseStudiesContent
        :body="cs_data.body"
      />
      <Window class="cs__footer" topBarText="next_project.exe" width="80">
        <div class="cs__footer-container">
          <prismic-image :field="next_data.cover" />
          <div class="cs__footer-content">
            <span class="styled-text">{{next_data.name}}</span>
            <div class="text-body">{{next_data.context}}</div>
            <nuxt-link class="button" :to="'/casestudies/' + next_data.ref">
              read more
            </nuxt-link>
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
        cs_data: null,
        next_data: null
      }
    },
    created() {
      const caseStudiesId = this.$route.params.id;
      const matchCaseStudyId = (item) => item.ref === caseStudiesId;
      const currentIndex = this.$store.state.caseStudies.findIndex(matchCaseStudyId);
      if (currentIndex !== -1) {
        this.cs_data = this.$store.state.caseStudies[currentIndex];
        this.next_data = this.$store.state.caseStudies[
          currentIndex === this.$store.state.caseStudies.length - 1
          ? 0
          : currentIndex + 1
        ];
      } else {
        //redirect to 404
      }
    }
  }
</script>