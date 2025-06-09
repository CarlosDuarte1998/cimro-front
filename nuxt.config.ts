// https://nuxt.com/docs/api/configuration/nuxt-config

import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  //SSR disabled for now

  ssr: false,

  ui: {
    colorMode: false
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
  ],





})