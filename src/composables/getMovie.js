import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getMovie = () => {
  const movie = ref(null);
  const error = ref(null);

  const fetchMovie = async (str) => {
    if (str.toLowerCase().includes("themoviedb")) {
      const id = extractTMDBId(str);
      fetchMovieById(id);
    } else if (isInteger(str)) {
      fetchMovieById(str);
    } else {
      const id = await searchMovie(str);
      if (error.value) {
        console.log(error.value);
        error.value = null;
      } else {
        fetchMovieById(id);
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
      const response = await tmdb.getDetails(id).catch((err) => {
        error.value = err;
      });
      movie.value = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const searchMovie = async (str) => {
    try {
      const response = await tmdb.searchMovies(str).catch((err) => {
        error.value = err;
      });
      // TODO: по хорошему выводить первые 5 результатов и предлагать выбор
      console.log(response.data);

      if (response.data.results.length === 0) {
        throw Error("Nothing found!");
      }
      return response.data.results[0].id;
    } catch (err) {
      console.log(err);
    }
  };

  return { movie, error, fetchMovie };
};

export default getMovie;
