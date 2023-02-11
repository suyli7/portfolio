<template>
  <div class="main" 
  >
    <IndexImages :hidden="hidden" />
    <button
      class="about__button"
      @click="setHidden(!hidden)"
    >
      Hello hello ✨(ㆆ◡ㆆ)✌️
    </button>
    <prismic-rich-text
      v-if="aboutData.data.intro_primary"
      class="about__content"
      :field="aboutData.data.intro_primary"
    />
    <div class="section">
      <WorkExperience
        :workExpData="aboutData.data.experience"
      />
      <div>
        <Links
          :connectIntro="aboutData.data.connect_header"
          :connectLinks="aboutData.data.links"
        />
        <Skills
          :skillsIntro="aboutData.data.tech_skills_intro"
          :recentSkills="aboutData.data.recent_tech_skills"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .about__content {
    margin-top: $spacing-xs;
    p {
      font-size: $fs-m;
    }
  }
  .section {
    margin-top: $spacing-xxl;
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    column-gap: $spacing-xxl;
  }
</style>
<script setup>
  const { client } = usePrismic();
  const hidden = ref(true);

  const { data: aboutData } = await useAsyncData('aboutData', () => client.getSingle('about'));

  function setHidden(value) {
    hidden.value = value;
  }
</script>
