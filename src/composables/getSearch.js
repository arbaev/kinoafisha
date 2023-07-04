// запрос на поиск фильма по названию
import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getSearch = () => {
  const searchResults = ref([]);
  const error = ref(null);

  // TODO: результат поиска один
  // TODO: результат поиска нет
  const searchMovie = async (str) => {
    await tmdb
      .searchMovies(str)
      .then((response) => {
        console.log(response);
        searchResults.value = response.data.results;
      })
      .catch((err) => {
        error.value = err;
      });
    // if (response.data.results.length === 1) {
    //   movie.value = response.data.results[0].id;

    //   // throw Error("Nothing found!");
    // } else {
    //   search.value = response.data.results;
    //   // return response.data.results[0].id;
    // }
  };

  return { searchResults, error, searchMovie };
};

export default getSearch;
