import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getMovie = () => {
  const movie = ref(null);
  const error = ref(null);

  const fetchMovie = async (str) => {
    if (str.toLowerCase().includes("themoviedb")) {
      const id = extractTMDBId(str);
      return fetchMovieById(id);
    } else if (isInteger(str)) {
      return fetchMovieById(str);
    } else {
      const id = await searchMovie(str);
      if (error.value) {
        console.log(error.value);
        error.value = null;
      } else {
        return fetchMovieById(id);
      }
    }
  };

  const extractTMDBId = (str) => {
    return /\/movie\/([\d]+?)\-/g.exec(str)[1];
  };

  const isInteger = (str) => {
    return /^\d+$/.test(str);
  };

  const fetchMovieById = async (id) => {
    try {
      const response = await tmdb.getDetails(id);
      movie.value = response.data;
    } catch (err) {
      return (error.value = err.message);
    }
  };

  const searchMovie = async (str) => {
    try {
      const response = await tmdb.searchMovies(str);
      // TODO: по хорошему выводить первые 5 результатов и предлагать выбор
      console.log(response.data);

      if (response.data.results.length === 0) {
        throw Error("Nothing found!");
      }
      return response.data.results[0].id;
    } catch (err) {
      return (error.value = err.message);
    }
  };

  return { movie, error, fetchMovie };
};

export default getMovie;
