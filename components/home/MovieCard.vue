<template>
  <v-row>
    <v-col
      v-for="movie in moviesStore.movies?.results"
      :key="movie.id"
      cols="12"
      sm="6"
      md="3"
      xl="3"
    >
      <v-card
        rounded="lg"
        class="cursor-pointer"
        color="#020617"
        @click="$router.push(`/${movie.id}`)"
      >
        <div
          v-if="movie.poster_path === null"
          class="flex place-content-center align-center h-[636px]"
        >
          <v-icon size="240">mdi-image-off</v-icon>
        </div>
        <v-img
          v-else
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
