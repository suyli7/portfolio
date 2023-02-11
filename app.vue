<template>
    <Nav />
    <NuxtPage />
</template>

<script setup>
  const siteMeta = {
      title: "Su Li :: UX Engineer",
      url: "https://lisuying.com/",
      description: "Seattle-based engineer specializing in front end development and ux design with 5 years of experience of building and delivering interactive user experiences on web and mobile.",
      preview: "https://lisuying.com/meta.jpg"
  }
  useHead({
    title: siteMeta.title,
    meta: [
      { name: 'description', content: siteMeta.description },
      { property: 'og:title', content: siteMeta.title },
      { property: 'og:url', content: siteMeta.url },
      { property: 'og:description', content: siteMeta.description}
    ]
  });
</script>
<style lang="scss">
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  --background-color: #0c24d5;
  --text-color: #eceef8;
  --text-color-strong: #ffffff;
  --text-color-dark: #0d0d0f;
  --link-background: #fffa74;
  --border-color: #ffffff;
  --button-color: #0d0e0f;
  --cursor-pointer: url("@/cursor_pointer_36_dark.png"), pointer;
  --cursor-default: url("@/cursor_default_36_dark.png"), default;
  background-color: var(--background-color);
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
  cursor: var(--cursor-pointer)
}

button {
  background-color: var(--text-color-strong);
  outline: none;
  border: $border;
  color: var(--text-color-dark);
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
  padding: $spacing-xxl $spacing-xl;
  min-height: 100vh;
  a {
    color: var(--text-color-dark);
    background-color: var(--text-color-strong);
    font-weight: $fw-b!important;
    padding: 0 $spacing-xxs;
    text-decoration: underline;
    &:hover {
      background-color: var(--link-background);
    }
  }
}

.section {
  margin-top: $spacing-xl;
}
</style>