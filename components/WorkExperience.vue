<template>
  <div class="workExperience">
    <HeaderText>
      Experience
    </HeaderText>
    <div class="workExperience__container">
      <Block
        v-for="(exp, index) in workExpData"
        v-bind:key="`workExp-${index}`"
      >
        <div class="expItem__duration">{{exp.duration}}</div>
        <div class="expItem__org">{{exp.org}}</div>
        <div class="expItem__role">{{exp.role}}</div>
        <div class="expItem__keyTech">
          <span v-for="t in exp.key_tech.split(', ')" :key="t.name" class="tag">
            {{t}}
          </span>
        </div>
        <prismic-rich-text
          class="expItem__description"
          :field="exp.description"
        />
      </Block>
    </div>
  </div>
</template>
<style lang="scss">
  .workExperience__container{
    margin-top: $spacing-l;
    display: grid;
    row-gap: $spacing-l;
  }
  .expItem {
    &__duration {
      display: inline-block;
      background-color: var(--text-color);
      color: var(--text-color-dark);
      padding: 0 $spacing-xxs;
      font-size: $fs-xxs;
      font-weight: $fw-m;
      text-transform: uppercase;
    }
    &__org {
      font-size: $fs-m;
      font-weight: $fw-b;
      margin: $spacing-xxs 0;
    }
    &__role {
      font-size: $fs-s;
    }
    &__keyTech {
      margin: $spacing-xs 0;
      .tag {
        padding: $spacing-xxs;
        font-size: $fs-xxs;
        border: $border;
        &:not(:first-of-type) {
          margin-left: $spacing-xxs;
        }
      }
    }
    &__description {
      margin-top: $spacing-s;
      p {
        margin: 0;
      }
    }
  }
</style>
<script setup>
  const props = defineProps(['workExpData'])
</script>