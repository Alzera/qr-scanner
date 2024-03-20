// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    analyze: {
      enabled: true,
      open: true,
    },
  },
})
