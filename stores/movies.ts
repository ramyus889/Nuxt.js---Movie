import { useDateFormat } from "@vueuse/core";
import { defineStore } from "pinia";

interface Results {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}
interface Movies {
  total_results: number;
  total_pages: number;
  results: Results[];
  page: number;
}

export const useMoviesStore = defineStore("movies", () => {
  const searchString: Ref<string> = ref("");
  const movies: Ref<Movies | null> = ref(null);
  const messageStore = useMessageStore();
  const page: Ref<number> = ref(1);
  const loading: Ref<boolean> = ref(false);
  async function featuresMovies() {
    try {
      loading.value = true;
      const runtimeConfig = useRuntimeConfig();
      const response: Movies = await $fetch(
        `https://api.themoviedb.org/3/discover/movie?page=1&api_key=${runtimeConfig.public.apiKey}`
      );
      movies.value = {
        ...response,
        results: response.results
          .filter((_, index) => index < 12)
          .map((movie: any) => {
            return {
              ...movie,
              release_date: useDateFormat(
                new Date(movie.release_date),
                "MMMM YYYY"
              ),
            };
          }),
      };
      loading.value = false;
    } catch (error: any) {
      messageStore.showMessage = true;
      messageStore.message = error;
      loading.value = false;
    }
  }
  async function searchMovies() {
    try {
      loading.value = true;
      const runtimeConfig = useRuntimeConfig();
      const response: Movies = await $fetch(
        `https://api.themoviedb.org/3/search/movie?page=${page.value}&query=${searchString.value}&api_key=${runtimeConfig.public.apiKey}`
      );
      movies.value = {
        ...response,
        results: response.results.map((movie: any) => {
          return {
            ...movie,
            release_date: useDateFormat(
              new Date(movie.release_date),
              "MMMM YYYY"
            ),
          };
        }),
      };
      loading.value = false;
    } catch (error: any) {
      messageStore.showMessage = true;
      messageStore.message = error;
      loading.value = false;
    }
  }
  return { movies, featuresMovies, searchMovies, loading, page, searchString };
});
