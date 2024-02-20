<template>
  <div class="main">
    <HeaderText>
      Featured work
    </HeaderText>
    <div v-if="dataPending">
      <HeaderText size="small">
        Loading my work for you...
      </HeaderText>
    </div>
    <div class="work__container" v-else>
      <Block
        v-for="item in reorderedWorkData"
        v-bind:key="`work-${item.uid}`"
      >
        <prismic-image :field="item.data.cover" />
        <HeaderText size="small">
          {{ item.data.name }}
        </HeaderText>
        {{ item.data.context }}
        <Tags :tags="item.data.tags.split(',')"/>
        <div class="actions__container">
          <nuxt-link
            v-if="item.data.is_case_study"
            :to="'/casestudy/' + item.uid"
            class="action"
          >
            read case &#8599;
          </nuxt-link>
          <a
            v-if="!item.data.is_case_study || item.data.website.url"
            class="action"
            v-bind:class="{ spaced: item.data.is_case_study }"
            target="_blank"
            :href="item.data.website.url"
          >
            visit site &#8599;
          </a>
        </div>
      </Block>
    </div>
  </div>
</template>
<style lang="scss">
  .work {
    &__container {
      height: auto;
      margin-top: $spacing-l;
      -moz-column-count: 3;
      -webkit-column-count: 3;
      column-count: 3;
      column-gap: $spacing-l;
      @include smallScreen {
        -moz-column-count: 2;
        -webkit-column-count: 2;
        column-count: 2;
      }
      @include tablet {
        -moz-column-count: 1;
        -webkit-column-count: 1;
        column-count: 1;
      }
      .block {
        display: inline-block;
        margin-bottom: $spacing-xl;
        .headerText {
          font-weight: $fw-m;
          margin: $spacing-xxs 0;
        }
        img {
          border: $border;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
      .tags__contanier {
        margin-top: $spacing-xs;
      }
      .actions__container {
        margin-top: $spacing-xs;
        font-size: $fs-s;
        .action {
          padding: 0 $spacing-xxs;
          display: inline-block;
          &.spaced {
            margin-left: $spacing-xxs;
          }
        }
      }
    }
  }
</style>
<script setup>
  const { client } = usePrismic();

  const { data: workData, pending: dataPending } = await useAsyncData('workData', () => 
    client.getAllByType('case_study', {
      orderings: {
        field: 'my.case_study.order'
      },
    })
  );

  function reorderForColLayout(items, cols) {
    const result = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < items.length; j+=cols) {
        let item = items[j+i];
        if (item) {
          result.push(item);
        }
      }
    }
    return result;
  }

  const reorderedWorkData = ref([]);

  onBeforeMount(() => {
    document.documentElement.setAttribute("theme", "colored");

    if (window.innerWidth <= 768) {
      reorderedWorkData.value = workData.value;
    } else if (window.innerWidth <= 1023 ) {
      reorderedWorkData.value = reorderForColLayout(workData.value, 2);
    } else {
      reorderedWorkData.value = reorderForColLayout(workData.value, 3);
    }
  })
</script>