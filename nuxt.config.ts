const MovieTheme = {
  dark: true,
  colors: {
    background: "#020617",
  },
};

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "vuetify-nuxt-module",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: "MovieTheme",
        themes: {
          MovieTheme,
        },
      },
      icons: {
        defaultSet: "mdi",
        sets: ["mdi", "fa"],
      },
    },
  },
  runtimeConfig: {
    public: {
      apiKey: "3b081ac4f58840796915c638f89bf2eb",
    },
  },
});