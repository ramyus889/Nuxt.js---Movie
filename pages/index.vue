<template>
  <v-container>
    <div class="text-h4 mt-8 mb-6">Feature Today</div>

    <HomeMovieCard />
    <HomeSkeletonCards />

    <v-pagination
      v-if="moviesStore.movies?.total_pages !== 1"
      v-model="moviesStore.page"
      :length="moviesStore.movies?.total_pages"
      class="my-10"
      @update:modelValue="moviesStore.searchMovies"
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore();

const page: Ref<number> = ref(1);

onBeforeMount(() => {
  if (moviesStore.movies === null) {
    moviesStore.featuresMovies();
  }
});
</script>
