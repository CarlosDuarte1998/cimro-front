// https://nuxt.com/docs/api/configuration/nuxt-config

import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // SSR habilitado para mejor SEO
  ssr: true,

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
    '@nuxtjs/device',
    '@nuxtjs/robots'
  ],

  // Configuración SEO global
  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      titleTemplate: '%s | CIMRO - Centro de Imágenes Médicas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'CIMRO - Centro de Imágenes Médicas' },
        { property: 'og:site_name', content: 'CIMRO' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@cimro_sv' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://cimro.com.sv' }
      ]
    }
  },

  // Configuración del sitemap
  nitro: {
    prerender: {
      routes: [
        '/',
        '/servicios',
        '/quienes-somos',
        '/contactanos',
        '/noticias',
        '/turismo-salud',
        '/videos'
      ]
    }
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_API_BASE_URL,
      SITE_URL: process.env.NUXT_SITE_URL || 'https://cimro.com.sv'
    }
  },

  // Configuración global del sitemap
  site: {
    url: 'https://cimro.com.sv'
  },

  // Configuración de performance
  experimental: {
    payloadExtraction: false
  },

  // Configuración de CSS crítico
  css: ['~/assets/css/main.css']





})