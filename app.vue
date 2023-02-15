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
html, html[theme="blue"]{
  --background-color: #1123AF;
  --text-color: #eceef8;
  --text-color-strong: #ffffff;
  --text-color-button: #0d0d0f;
  --text-color-dark: #0d0d0f;
  --text-color-link: #0d0d0f;
  --text-color-link-active: #1123AF;
  --link-background: #fffa74;
  --border-color: #ffffff;
  --cursor-pointer: url("@/assets/images/cursor_pointer_36_dark.png"), pointer;
  --cursor-default: url("@/assets/images/cursor_default_36_dark.png"), default;
}
html[theme="light"] {
  --background-color: #ffffff;
  --text-color: #0d0d0f;
  --text-color-strong: #1123AF;
  --text-color-button: #ffffff;
  --text-color-dark: #1123AF;
  --text-color-link: #ffffff;
  --border-color: #1123AF;
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
  transition: opacity 0.12s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
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

::-webkit-scrollbar{width:2px;height:2px;}
::-webkit-scrollbar-button{width:2px;height:2px;}

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

button {
  background-color: var(--text-color-strong);
  outline: none;
  border: $border;
  color: var(--text-color-button);
  font-size: $fs-s;
  padding: $spacing-xxs $spacing-xs;
  position: relative;
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

ul {
  padding: 0;
  list-style: none;
}

li {
  margin-top: $spacing-xxs;
}

a {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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
    color: var(--text-color-link);
    background-color: var(--text-color-strong);
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
</style>