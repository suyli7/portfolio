<template>
    <Nav />
    <NuxtPage />
    <Footer />
</template>

<script setup>
  const siteMeta = {
      title: "Su Li :: UX Engineer",
      url: "https://lisuying.com/",
      description: "Seattle-based engineer specializing in front end development and ux design with 5 years of experience of building and delivering interactive user experiences on web and mobile.",
      preview: "https://lisuying.com/preview.jpg"
  }
  useHead({
    title: siteMeta.title,
    meta: [
      { name: 'description', content: siteMeta.description },
      { property: 'og:type', content: "website" },
      { property: 'og:title', content: siteMeta.title },
      { property: 'og:url', content: siteMeta.url },
      { property: 'og:description', content: siteMeta.description},
      { property: 'og:image', content: siteMeta.preview }
    ]
  });
</script>
<style lang="scss">
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: var(--background-color);
}
html {
  --primary-color: #0b1c9d;
  --link-background: #fffa74;
  --dark:  #0e0e11;
  --light: #eceef8;
  --contrast-color-light: #ffffff;
  --button-color: var(--primary-color);
};
html[theme="colored"]{
  --background-color: var(--dark);
  --text-color: var(--light);
  --text-color-strong: var(--contrast-color-light);
  --text-color-button: var(--contrast-color-light);
  --text-color-dark: var(--dark);
  --text-color-link: var(--dark);
  --text-color-link-active: var(--primary-color);
  --border-color: var(--primary-color);
  --cursor-pointer: url("@/assets/images/cursor_pointer_36_dark.png"), pointer;
  --cursor-default: url("@/assets/images/cursor_default_36_dark.png"), default;
}
html[theme="light"] {
  --background-color: var(--contrast-color-light);
  --text-color: var(--dark);
  --text-color-strong: var(--primary-color);
  --text-color-button: var(--contrast-color-light);
  --text-color-dark: var(--primary-color);
  --text-color-link: var(--contrast-color-light);
  --border-color: var(--primary-color);
  --cursor-pointer: url("@/assets/images/cursor_pointer_36.png"), pointer;
  --cursor-default: url("@/assets/images/cursor_default_36.png"), default;
}
body{
  font-family: $priFont;
  font-size: $fs-xs;
  font-weight: $fw-r;
  line-height: 1.6;
  letter-spacing: 0.02rem;
  box-sizing: border-box;
  color: var(--text-color);
  *{
    cursor: var(--cursor-default);
  }
  @include mobile {
    font-size: $fs-xxs;
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.12s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

::selection {
  background: var(--link-background);
  color: var(--text-color-dark);
  -webkit-text-stroke-color: var(--link-background);
}

::-moz-selection {
  background: var(--link-background);
  color: var(--text-color-dark);
  -webkit-text-stroke-color: var(--link-background);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

p{
  margin-bottom: $spacing-m;
}

a, button {
  cursor: var(--cursor-pointer);
}

ul {
  padding: 0;
  list-style: none;
}

li {
  margin-top: $spacing-xxs;
}

a, strong, h1, h2, h3, h4, h5, h6 {
  color: var(--text-color-strong);
}

strong {
  font-weight: $fw-b!important;
}

.main {
  margin-top: $spacing-l;
  padding: $spacing-xxl;
  min-height: 100vh;
  a {
    transition: all 0.12s;
    color: var(--contrast-color-light);
    background-color: var(--button-color);
    font-weight: $fw-b!important;
    padding: 0 $spacing-xxs * 0.5;
    text-decoration: underline;
    &:hover {
      background-color: var(--link-background);
      color: var(--text-color-link-active);
    }
  }
  @include tablet {
    padding: $spacing-xxl $spacing-xl;
  }
  @include mobile {
    padding: $spacing-xl $spacing-m;
  }
}

.section {
  margin-top: $spacing-xl;
}

a.button,
button {
  text-decoration: none;
  background-color: var(--button-color);
  outline: none;
  border: $border;
  color: var(--text-color-button);
  font-size: $fs-s;
  padding: $spacing-xxs $spacing-xs;
  position: relative;
  display: inline-block;
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-bottom: $border;
    border-right: $border;
    bottom: -5px;
    right: -5px;
    transition: all 0.16s;
  }
  &:hover {
    &::after {
      bottom: -8px;
      right: -8px;
    }
  }
}
</style>