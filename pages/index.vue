<template>
  <v-container>
    <div class="text-h4 mt-8 mb-6">Feature Today</div>

    <HomeMovieCard />
    <v-row>
      <v-col v-for="(movie, index) in 12" :key="index" cols="3">
        <v-skeleton-loader
          v-if="!moviesStore.movies"
          type="image"
          class="mx-auto skeleton-card"
          max-width="424"
          height="626"
          color="transparent"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

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
  moviesStore.featuresMovies();
});
</script>

<style scoped>
.skeleton-card :deep(.v-skeleton-loader__bone) {
  height: 626px !important;
  width: 424px !important;
  border-radius: 12px !important;
}
</style>
