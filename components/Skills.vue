<template>
  <div class="skills">
    <HeaderText size="small">
      {{ skillsIntro }}
    </HeaderText>
    <div class="skills__tech" v-if="recentSkills">
      <span v-for="t in recentSkills.split(',')" :key="t.name" class="tag">
        {{t}}
      </span>
    </div>
  </div>
</template>
<style lang="scss">
  .skills {
    display: block;
    margin-top: $spacing-xl;
    &__tech {
      margin-top: $spacing-s;
      .tag {
        padding: $spacing-xxs $spacing-xs;
        font-size: $fs-xs;
        border: $border;
        &:not(:first-of-type) {
          margin-left: $spacing-xs;
        }
      }
    }
  }
</style>
<script setup>
  const props = defineProps(['skillsIntro','recentSkills'])
</script>