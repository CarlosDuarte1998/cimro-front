// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css', '~/assets/css/styles.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@pinia/nuxt',
    '@vesp/nuxt-fontawesome',
    'v-gsap-nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/sitemap'
  ],
  fontawesome: {
    icons: {
      solid: ['dollar-sign', 'cog', 'circle', 'check', 'calendar'],
      brands: ['twitter', 'facebook', 'linkedin', 'github'],
      regular: ['user'],
    },
  },
})