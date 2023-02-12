<template>
  <div class="main">
    <HeaderText>
      Featured work
    </HeaderText>
    <div class="work__container" v-if="workData">
      <Block
        v-for="item in workData"
        v-bind:key="`work-${item.uid}`"
      >
        <prismic-image :field="item.data.cover" />
        <HeaderText size="small">
          {{ item.data.name }}
        </HeaderText>
        {{ item.data.context }}
        <div
          class="tags__contanier"
          v-if="item.data.tags"
        >
          <div
            v-for="t in item.data.tags.split(',')"
            v-bind:key="t.name"
            class="tag"
          >
              {{t}}
          </div>
        </div>
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

  const { data: workData } = await useAsyncData('workData', () => 
    client.getAllByType('case_study', {
      orderings: {
        field: 'my.case_study.order'
      },
    }),
    {
      transform: reorderForColLayout
    }
  );

  function reorderForColLayout(items) {
    const result = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < items.length; j+=3) {
        let item = items[j+i];
        if (item) {
          result.push(item);
        }
      }
    }
    return result;
  }
</script>