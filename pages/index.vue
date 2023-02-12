<template>
  <div class="main" 
  >
    <IndexImages :hidden="hidden" />
    <button
      class="about__button"
      @click="setHidden(!hidden)"
    >
      {{ hidden ? "Hello hello" : "Bye bye"}} ✨(ㆆ◡ㆆ)✌️
    </button>
    <prismic-rich-text
      v-if="aboutData.data.intro_primary"
      class="about__content"
      :field="aboutData.data.intro_primary"
    />
    <div class="section">
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
      <WorkExperience
        :workExpData="aboutData.data.experience"
      />
    </div>
    <Facts
      :facts_intro="aboutData.data.intro_secondary"
      :facts="aboutData.data.intro_facts"
    />
  </div>
</template>
<style lang="scss">
  .about__content {
    margin-top: $spacing-s;
    p {
      font-size: $fs-m;
      @include tablet {
        font-size: $fs-s;
      }
    }
  }
  .section {
    margin-top: $spacing-xxl;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 2fr;
    column-gap: $spacing-xxl;
    @include tablet {
      grid-template-columns: 1fr;
      column-gap: $spacing-xl;
      margin-top: $spacing-xl;
    }
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
