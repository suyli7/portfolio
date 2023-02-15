<style lang="scss" scoped>
  .cs__textImage{
    &Video{
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
  .cs__textImage.reverse{
    div:first-of-type{
      order: 2;
      @include tablet{
        order: 1;
      }
    } 
    div:last-of-type{
      order: 1;
      @include tablet{
        order: 2;
      }
    }
  }
</style>
<template>
  <div 
    :class="['cs__textImage', 'cs__grid', reverse && 'reverse']"
  >
    <div>
      <CsHeader>{{header}}</CsHeader>
      <prismic-rich-text :field="text" class="text"/>
    </div>
    <div class="cs__textImageContainer">
      <div v-if="video" class="cs__textImageVideo">
        <iframe
          :src="video"
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <prismic-image :field="image" />
    </div>
  </div>
</template>
<script setup>
  const props = defineProps([
    'reverse',
    'header',
    'text',
    'image',
    'video'
  ])
</script>