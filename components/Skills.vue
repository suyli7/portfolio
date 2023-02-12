<template>
  <div class="skills">
    <HeaderText size="small">
      {{ skillsIntro }}
    </HeaderText>
    <div class="skills__tech tagsContainer" v-if="recentSkills">
      <div
        v-for="t in recentSkills.split(',')"
        v-bind:key="t.name"
        class="tag"
      >
        {{t}}
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .skills {
    margin-top: $spacing-xl;
    &__tech {
      margin-top: $spacing-s;
    }
  }
</style>
<script setup>
  const props = defineProps(['skillsIntro','recentSkills'])
</script>