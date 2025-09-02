// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt',  'pinia-plugin-persistedstate/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  icon: {
    provider: 'iconify',
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
        },

        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.cdnfonts.com/css/balgin-black' 
        // }
      ],
    },
  },
})