<template>
  <div class="main caseStudy" v-if="cs">
    <CsIntro
      :name="cs.data.name"
      :context="cs.data.context"
      :role="cs.data.role"
      :tools="cs.data.tools"
      :cover="cs.data.cover"
      :timeframe="cs.data.timeframe"
      :website="cs.data.website"
    />
    <div class="caseStudy__content">
      <component
        class="cs__slice"
        v-for="(slice, index) in cs.data.body"
        v-bind:key="slice.slice_type+index"
        :is="{...SLICES_REF[slice.slice_type]}"
        v-bind="{...slice.primary, items: slice.items}"
      />
	  </div>
  </div>
  <div class="main" v-else>
    <HeaderText>Project not found</HeaderText>
  </div>
</template>
<style lang="scss">
  .caseStudy {
    &__content {
      margin-top: $spacing-xxl;
      .cs__slice {
        margin: $spacing-xxl auto;
        width: 80%;
        max-width: 1400px;
      }
      .cs__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: $spacing-xxl;
        align-items: center;
      }
      img {
        width: 100%;
      }
      .text {
        font-weight: $fw-r;
      }
    }
    @include tablet {
      &__content {
        margin-top: $spacing-xl;
        .cs__slice {
          width: 100%;
          margin: $spacing-l auto;
        }
        .cs__grid {
          grid-template-columns: 1fr;
        }
      }
    }
  }
</style>
<script setup>
  const { client } = usePrismic();
  const route = useRoute();
  const doc_uid = route.params.id;
  const { data: cs } = await useAsyncData('case_study',
    () => client.getByUID('case_study', doc_uid)
  );
  onBeforeMount(() => {
    document.documentElement.setAttribute("theme", "light");
  });
  const CsImage = resolveComponent('CsImage');
  const CsImagesList = resolveComponent('CsImagesList');
  const CsGrid = resolveComponent('CsGrid');
  const CsSingleText = resolveComponent('CsSingleText');
  const CsDoubleText = resolveComponent('CsDoubleText');
  const CsHeaderText = resolveComponent('CsHeaderText');
  const CsTriGrid = resolveComponent('CsTriGrid');
  const CsTextRow = resolveComponent('CsTextRow');
  const CsTextImage = resolveComponent('CsTextImage');
  const CsVideoIntro = resolveComponent('CsVideoIntro');

  const SLICES_REF = ref({
    image: CsImage,
    images_list: CsImagesList,
    grid: CsGrid,
    single_text: CsSingleText,
    double_text: CsDoubleText,
    header_text: CsHeaderText,
    tri_grid: CsTriGrid,
    text_row: CsTextRow,
    text_image: CsTextImage,
    video_intro: CsVideoIntro,
  });
</script>