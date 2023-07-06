// запрос на поиск фильма по названию
import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getSearch = () => {
  const searchResults = ref([]);
  const error = ref(null);

  const searchMovie = async (str) => {
    await tmdb
      .searchMovies(str)
      .then((response) => {
        searchResults.value = response.data.results;
      })
      .catch((err) => {
        error.value = err;
      });
  };

  return { searchResults, error, searchMovie };
};

export default getSearch;
