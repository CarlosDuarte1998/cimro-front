// https://nuxt.com/docs/api/configuration/nuxt-config

import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // SPA mode para compatibilidad con hosting compartido
  ssr: false,
  
  // Configuración específica para SPA y hosting compartido
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      failOnError: false
    },
    experimental: {
      wasm: true
    }
  },

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

  // Configuración de robots para baseURL
  robots: {
    robotsTxt: false
  },

  // Configuración SEO global
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      titleTemplate: '%s | CIMRO - Centro de Imágenes Radiológicas de Occidente',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'CIMRO - Centro de Imágenes Radiológicas de Occidente' },
        { name: 'description', content: 'CIMRO - Centro de Imágenes Radiológicas de Occidente en Santa Ana, El Salvador. Tomografía computarizada, ultrasonidos, rayos X, mamografía, cardiología. Diagnóstico por imágenes con tecnología de vanguardia.' },
        { name: 'keywords', content: 'CIMRO, Centro de Imágenes Radiológicas de Occidente, Santa Ana, tomografía computarizada Santa Ana, ultrasonidos Santa Ana, rayos x Santa Ana, mamografía Santa Ana, cardiología Santa Ana, diagnóstico por imágenes El Salvador, radiología occidente El Salvador, centro médico Santa Ana, SISA, ACSA, MAPFRE, Seguros Azul' },
        { property: 'og:site_name', content: 'CIMRO - Centro de Imágenes Radiológicas de Occidente' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'CIMRO - Centro de Imágenes Radiológicas de Occidente Santa Ana' },
        { property: 'og:description', content: 'Centro especializado en diagnóstico por imágenes en Santa Ana, El Salvador. Tomografía, ultrasonidos, rayos X, mamografía y cardiología con aseguradoras afiliadas.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@cimro_sv' },
        { name: 'twitter:title', content: 'CIMRO - Centro de Imágenes Radiológicas de Occidente' },
        { name: 'twitter:description', content: 'Servicios de diagnóstico por imágenes en Santa Ana, El Salvador. Tecnología de vanguardia y personal especializado.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://cimro.com.sv' }
      ]
    }
  },

  // Configuración de performance
  experimental: {
    payloadExtraction: false
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

  // Configuración de CSS crítico
  css: ['~/assets/css/main.css']





})
