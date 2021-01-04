export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: true,

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap',
      },
    ],
    script: [
      {
        src:
          'https://cdn.polyfill.io/v2/polyfill.min.js?features=Element.prototype.classList',
      },
      {
        src:
          'https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js',
      },
    ],
  },

  /*
   ** Global CSS
   */
  css: ['flag-icon-css/css/flag-icon.min.css'],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: '~/plugins/prismicLinks', ssr: false }],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: {
    dirs: ['~/components', '~/pixelslices/components'],
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module', // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/pwa',
    '@nuxtjs/color-mode',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [['@nuxtjs/prismic'], ['nuxt-sm']],
  prismic: {
    endpoint: 'https://pixelslices-2020.cdn.prismic.io/api/v2',
    apiOptions: {
      routes: [
        {
          type: 'page',
          path: '/:lang/:uid',
        },
        {
          type: 'homepage',
          path: '/:lang',
        },
      ],
    },
    disableGenerator: false,
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
    transpile: ['vue-slicezone', 'nuxt-sm'],
  },

  storybook: {
    stories: ['~/pixelslices/**/*.stories.js'],
    addons: ['@storybook/addon-knobs/register'],
    parameters: {
      layout: 'fullscreen',
    },
  },

  ignore: ['**/*.stories.js'],

  pwa: {
    icon: {
      source: './static/icon.png',
    },
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: 'black-translucent',
    },
    manifest: {
      name: 'Pixelslices',
      short_name: 'Pxlsls',
      theme_color: '#2c3136',
      description: 'A neat slice library for Slicemachine by Prismic.',
    },
  },
  generate: {
    fallback: '404.html',
  },
}
