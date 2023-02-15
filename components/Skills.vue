<template>
  <div class="skills">
    <HeaderText size="small">
      {{ skillsIntro }}
    </HeaderText>
    <div class="skills__tech tagsContainer" v-if="recentSkills">
      <Tags :tags="recentSkills.split(',')" />
    </div>
  </div>
</template>
<style lang="scss">
  .skills {
    &__tech {
      margin-top: $spacing-s;
    }
  }
</style>
<script setup>
  const props = defineProps(['skillsIntro','recentSkills'])
</script>