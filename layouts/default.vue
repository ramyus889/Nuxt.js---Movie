<script setup lang="ts">
const search: Ref<string> = ref("");
const moviesStore = useMoviesStore();
const router = useRouter();

const { width } = useWindowSize();

const barHeight = computed(() => {
  if (width.value >= 960) {
    return 65;
  } else {
    return 150;
  }
});
</script>

<template>
  <v-app id="inspire">
    <v-app-bar :height="barHeight" color="#111827" class="px-10" flat>
      <v-container class="d-flex align-center">
        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex max-[960px]:justify-center align-center">
              <v-icon
                size="48"
                class="cursor-pointer"
                @click="$router.push('/')"
                >mdi-movie-open-play</v-icon
              >

              <p class="text-h5 ml-4 cursor-pointer" @click="$router.push('/')">
                Movie Search
              </p>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="moviesStore.searchString"
              variant="outlined"
              density="compact"
              hide-details
              append-inner-icon="mdi-magnify"
              placeholder="Search for a movie"
              @click:append-inner="moviesStore.searchMovies"
              @keyup.enter="moviesStore.searchMovies"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <slot />
      <Message />
    </v-main>
  </v-app>
</template>
