<template>
  <v-container>
    <div v-if="status === 'pending'" class="d-flex justify-start align-start">
      <v-row>
        <v-col cols="6">
          <v-skeleton-loader
            type="image"
            class="skeleton-card"
            color="transparent"
          ></v-skeleton-loader>
        </v-col>

        <v-col cols="6">
          <v-skeleton-loader
            type="heading, list-item, avatar, chip, chip, chip, heading, paragraph"
            class="mx-auto"
            color="transparent mt-[20px]"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-else class="mb-10">
      <v-row class="mt-5">
        <v-col cols="6">
          <div
            v-if="movie?.backdrop_path === null"
            class="flex place-content-center align-center h-[490px]"
          >
            <v-icon size="240">mdi-image-off</v-icon>
          </div>
          <v-img
            v-else
            rounded="lg"
            :src="`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`"
          ></v-img>
        </v-col>

        <v-col cols="6">
          <div class="text-h4 mt-8 mb-1">{{ movie?.title }}</div>
          <p class="text-grey">
            {{ movie?.release_date }} - {{ movie?.runtime }} -
            {{ movie?.budget }}
          </p>

          <v-chip
            v-for="(genre, index) in movie?.genres"
            :key="index"
            variant="outlined"
            class="mr-2 mt-4 mb-5"
            >{{ genre }}</v-chip
          >

          <HomeScoreCircleId :score="movie?.vote_average" />

          <p class="mt-4">{{ movie?.overview }}</p>
        </v-col>
      </v-row>

      <p class="text-h4 my-5">Cast</p>

      <v-row>
        <v-col class="flex place-content-center">
          <div class="inline-grid grid-cols-4 gap-5">
            <v-card
              v-for="(card, index) in movie?.cast"
              :key="index"
              rounded="lg"
            >
              <div
                v-if="card?.profile_path === null"
                class="flex justify-center align-center"
              >
                <v-icon size="170">mdi-image-off</v-icon>
              </div>
              <v-img
                v-else
                :src="`https://image.tmdb.org/t/p/original/${card.profile_path}`"
                width="100%"
              ></v-img>
              <v-card-text>
                <div class="text-h6">{{ card.name }}</div>
                <div class="text-grey">{{ card.character }}</div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <v-col>
          <div
            v-if="movie?.movieSrc === null"
            class="flex justify-center align-center"
          >
            <v-icon size="170">mdi-video-off</v-icon>
          </div>
          <iframe
            v-else
            ref="el"
            class="rounded-lg"
            :src="movie?.movieSrc"
            frameborder="0"
            width="100%"
            :height="height"
            :title="movie?.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
interface Cast {
  profile_path: string;
  name: string;
  character: string;
  cast?: Cast[];
}

interface Credits {
  cast: Cast[];
}

interface Genres {
  name: string;
}

interface Video {
  results: VideoResults[];
}

interface VideoResults {
  key: string;
}

interface Movie {
  title: string;
  backdrop_path: string;
  cast: Cast[];
  release_date: string;
  runtime: number;
  credits: Credits;
  budget: number;
  genres: Genres[];
  vote_average: number;
  overview: string;
  videos: Video;
}

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const messageStore = useMessageStore();

const { data: movie, status } = await useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${runtimeConfig.public.apiKey}&append_to_response=videos,credits`,
  {
    transform(input: Movie) {
      return {
        title: input.title,
        backdrop_path: input.backdrop_path,
        release_date: useDateFormat(new Date(input.release_date), "MMMM YYYY"),
        runtime: `${parseInt(input.runtime / 60).toString()}h ${
          input.runtime % 60
        }min`,
        credits: input.credits,
        budget: input.budget.toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
        }),
        genres: input.genres.map((genre) => genre.name),
        vote_average: input.vote_average,
        overview: input.overview,
        movieSrc: getMovieSrc(input.videos.results),
        cast: input.credits.cast.filter((_, index) => index < 8),
      };
    },
    onResponseError({ request, response, options }) {
      messageStore.showMessage = true;
      messageStore.message = response._data.status_message;
    },
  }
);

function getMovieSrc(videos: any) {
  const movieInfo = videos.find((video: any) =>
    video.name.toLowerCase().includes("trailer")
  );
  if (movieInfo) {
    return `https://www.youtube.com/embed/${movieInfo.key}`;
  } else {
    return null;
  }
}

const el = ref(null);
const { width } = useElementSize(el);

const height = computed(() => (315 * width.value) / 560);
</script>
<style scoped>
.skeleton-card :deep(.v-skeleton-loader__bone) {
  height: 490px !important;
  width: 872px !important;
  border-radius: 12px !important;
}
.skeleton-card2 :deep(.v-skeleton-loader__bone) {
  height: 490px !important;
  border-radius: 12px !important;
}
</style>
