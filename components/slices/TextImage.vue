<style lang="scss" scoped>
  .cs__text-image{
    img{
      width: 100%;
    }
    column-gap: $spacing-xxl;
    align-items: center;
    &-video{
      margin-top: $spacing-xl;
      padding-bottom: 56.25%;
      width: 100%;
      height: 0;
      position: relative;
      iframe{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    @include tablet{
      > div:last-of-type{
        margin-top: $spacing-l;
      }
    }
  }
  .cs__text-image.reverse{
    div:first-of-type{
      order: 2;
    } 
    div:last-of-type{
      order: 1;
      @include tablet{
        margin-bottom: $spacing-l;
      }
    }
  }
</style>
<template>
  <div :class="reverse ? 'cs__text-image grid-container reverse' : 'cs__text-image grid-container'">
    <div>
      <Header>{{header}}</Header>
      <prismic-rich-text :field="text" class="text"/>
    </div>
    <div>
      <div v-if="video" class="cs__text-image-video">
        <iframe :src="video" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
      </div>
      <prismic-image :field="image" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    reverse: Boolean,
    header: String,
    text: Array,
    image: Object,
    video: String,
  }
}
</script>