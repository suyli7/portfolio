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
      <Story 
        :story="aboutData.data.intro_secondary"
        :profile="aboutData.data.profile_pic"
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
    <WorkExperience
      :workExpData="aboutData.data.experience"
    />
    <Facts
      :facts="aboutData.data.intro_facts"
    />
  </div>
</template>
<style lang="scss">
  .about__content {
    width: 90%;
    margin-top: $spacing-s;
    p {
      font-size: $fs-l;
      line-height: 2;
      @include tablet {
        font-size: $fs-m;
      }
    }
  }
  .section {
    margin-top: $spacing-xxl;
    display: grid;
    grid-template-columns: 1.5fr minmax(0, 1fr);
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

  onBeforeMount(() => {
    document.documentElement.setAttribute("theme", "blue");
  });
</script>
