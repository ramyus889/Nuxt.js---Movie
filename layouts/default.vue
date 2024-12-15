<script setup lang="ts">
const search: Ref<string> = ref("");
const moviesStore = useMoviesStore();
</script>

<template>
  <v-app id="inspire">
    <v-app-bar height="65" color="#111827" class="px-10" flat>
      <v-container class="d-flex align-center">
        <v-icon size="48">mdi-movie-open-play</v-icon>

        <p class="text-h4 ml-4">Movie Search</p>

        <v-spacer></v-spacer>

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
      </v-container>
    </v-app-bar>

    <v-main>
      <slot />
      <Message />
    </v-main>
  </v-app>
</template>
