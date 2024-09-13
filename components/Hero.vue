<template>
  <div>
    <Window topBarText="hello.exe">
      <button @click="toggleImages()" class="hero-button">
        <span>✨(ㆆ◡ㆆ)✌️</span>
        <span class="styled-title">{{ hidden ? "ni hao!" : "bye bye!" }}</span>
      </button>
      <prismic-rich-text v-if="introData"
        class="hero-intro__content" :field="introData.content_primary"
      />
      <div v-else>
        Hi, I'm Su. I'm a UX Engineer based in Seattle. I design and develop solutions for problems where user experience, visual aesthetics and technology collide. Currently, I'm a Front End Engineer at IMDb working on video experiences.
      </div>
    </Window>
  </div>
</template>
<script>
export default {
  data() {
    return{
      introData: this.$store.state.intro,
    }
  },
  props: {
    toggleImages: Function,
    hidden: Boolean
  }
}
</script>
<style lang="scss" scoped>
  .hero-intro__content {
    ::v-deep a {
      @extend .link-hover;
    }
    ::v-deep h2{
      font-size: $fs-m;
      @extend .text-body;
      @include mobile {
        font-size: $fs-s;;
      }
    }
  }
  .hero-button{
    margin-bottom: $spacing-s;
    span {
      font-size: $fs-s;
      cursor: var(--cursor-pointer);
      font-weight: $fw-m;
    }
    span:first-child {
      font-weight: $fw-b;
    }
  }
  #hero_img_t{
    top: -100px;
  }
  #hero_img_b{
    bottom: -100px;
  }
  .hero-img-show-t{
    top: 0!important;
  }
  .hero-img-show-b{
    bottom: 0!important;
  }
  #hero_img_bLeft,#hero_img_bRight{
    bottom: 0;
  } 
  #hero_img_tLeft,#hero_img_tRight{
    transform: scaleY(-1);
    top: 0;
  } 
  #hero_img_bLeft, #hero_img_tLeft{
    left: 0;
  }
  #hero_img_bRight, #hero_img_tRight{
    transform: scaleX(-1);
    right: 0;
  }
  #hero_img_tRight{
    transform: scaleY(-1) scaleX(-1);
  }
</style>