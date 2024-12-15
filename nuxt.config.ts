export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "@unocss/nuxt"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      icons: {
        defaultSet: "mdi",
        sets: ["mdi", "fa"],
      },
    },
  },
});
