export default defineNuxtConfig({
  head: {
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href:"https://fonts.gstatic.com",
        crossorigin: true
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap",
      }
    ],
  },
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
              additionalData: '@use "@/assets/global.scss" as *;',
            },
        },
    },
  },
  modules: [
    '@nuxtjs/prismic'
  ],
  prismic: {
    endpoint: process.env.NUXT_ENV_PRISMIC_ENDPOINT,
    preview: false,
    toolbar: false,
    apiOptions: {
      accessToken: process.env.NUXT_ENV_PRISMIC_TOKEN
    }
  }
});