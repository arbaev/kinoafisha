import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useKinoAfishaStore = defineStore("kinoAfisha", () => {
  const isPrinting = ref(false);
  const movies = ref([]);
  const searchString = ref("");

  const setIsPrinting = (bool) => {
    isPrinting.value = bool;
  };

  const setSearchString = (str) => {
    searchString.value = str;
  };

  const addMovie = (movie) => {
    if (isMovieUnique(movie.id)) {
      movies.value.unshift(movie);
    }
  };

  const removeMovie = (movie) => {
    movies.value = movies.value.filter((m) => m.id !== movie.id);
  };

  const isMovieUnique = (movie_id) => {
    return !movies.value.find((item) => item.id === movie_id);
  };

  return {
    movies,
    addMovie,
    removeMovie,
    isPrinting,
    setIsPrinting,
    searchString,
    setSearchString,
  };
});
