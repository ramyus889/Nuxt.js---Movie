<template>
  <v-row>
    <v-col
      v-for="(movie, index) in 12"
      :key="index"
      cols="12"
      sm="6"
      md="3"
      xl="3"
    >
      <v-skeleton-loader
        v-if="!moviesStore.movies"
        type="image"
        class="mx-auto skeleton-card"
        max-width="424"
        color="transparent"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore();
</script>

<style scoped>
.skeleton-card :deep(.v-skeleton-loader__bone) {
  max-height: 626px !important;
  width: 424px !important;
  border-radius: 12px !important;
}
</style>
