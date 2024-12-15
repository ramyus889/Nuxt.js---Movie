<template>
  <v-row>
    <v-col
      v-for="movie in moviesStore.movies?.results"
      :key="movie.id"
      cols="3"
    >
      <v-card rounded="lg" class="" color="#020617">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          rounded="lg"
        >
        </v-img>
        <v-card-text
          class="px-2 mt-1 d-flex justify-space-between align-center"
        >
          <div class="">
            <div class="text-[18px]">{{ titleStrings(movie.title) }}</div>
            <div class="text-[18px] text-gray">{{ movie.release_date }}</div>
          </div>
          <ScoreCircle :score="movie.vote_average" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
function titleStrings(title: string) {
  return `${title.substring(0, 25)}${title.length > 25 ? "..." : ""}`;
}
const moviesStore = useMoviesStore();
</script>
