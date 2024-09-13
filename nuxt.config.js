import CONFIG from './site-config';
export default {
  mode: 'universal',
  target: 'static',
  ssr: false,
  htmlAttrs: {
    lang: 'en'
  },
  head: {
    title: CONFIG.siteTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: CONFIG.description },
      { property: 'og:title', content: CONFIG.siteTitle },
      { property: 'og:url', content: CONFIG.siteUrl },
      { property: 'og:image', content: CONFIG.metaImageUrl },
      { property: 'og:description', content: CONFIG.description},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&family=Lexend+Mega&display=swap' }
    ]
  },
  components: true,
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/prismic'
  ],
  prismic: {
    endpoint: process.env.NUXT_ENV_PRISMIC_ENDPOINT,
    apiOptions: {
      accessToken: process.env.NUXT_ENV_PRISMIC_TOKEN
    },
    preview: false
  },
  styleResources: {
    scss: [
      '~/assets/mixins.scss',
      '~/assets/variables.scss',
      '~/assets/default.scss',
    ]
  },
  build: {
    splitChunks: {
      layouts: true
    }
  },
  plugins: [{ src: '~/plugins/nuxt-client-init.js', ssr: false }]
}
