<template>
	<div class="cs__wrapper wrapper">
    <component
        :key="slice.slice_type+index"
        v-for="(slice, index) in body"
        :is="slices[slice.slice_type]"
        v-bind="{...slice.primary, items: slice.items}"
        class="cs__slice"
    />
	</div>
</template>
<script>
import CSImage from './slices/CSImage';
import ImagesList from './slices/ImagesList';
import Grid from './slices/Grid';
import SingleText from './slices/SingleText';
import DoubleText from './slices/DoubleText';
import HeaderText from './slices/HeaderText';
import TriGrid from './slices/TriGrid';
import TextRow from './slices/TextRow';
import TextImage from './slices/TextImage';
import VideoIntro from './slices/VideoIntro';

export default {
	props: {
		body: Array
	},
  components: {
    CSImage,
    ImagesList,
    Grid,
    SingleText,
    DoubleText,
    HeaderText,
    TriGrid,
    TextRow,
    TextImage,
    VideoIntro,
  },
  data() {
    return {
      slices: {
        image: "CSImage",
        images_list: "ImagesList",
        grid: "Grid",
        single_text: "SingleText",
        double_text: "DoubleText",
        header_text: "HeaderText",
        tri_grid: "TriGrid",
        text_row: "TextRow",
        text_image: "TextImage",
        video_intro: "VideoIntro",
      }
    }
  }
}
</script>
<style lang="scss" scoped>
	.cs{
		::v-deep &__wrapper{
			padding: $spacing-xl 0;
    }
    ::v-deep &__slice{
      padding: $spacing-xl 0;
      .header{
        margin: $spacing-m 0 $spacing-xs 0;
        span {
          font-size: $fs-m;
          line-height: 1.6;
        }
      }
      .text{
        @extend .text-body;
        font-size: $fs-xs;
      }
      ul, ol {
        padding: 0 0 $spacing-xs;
        list-style: none;
      }
      a {
        @extend .link-hover;
      }
      p:last-child{
        margin-bottom: 0;
      }
      @include tablet{
        padding: $spacing-m;
      }
      @include mobile{
        padding: 0;
      }
    }
  }
</style>