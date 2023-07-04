// запрос фильма по его id
import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getMovie = () => {
  const movie = ref({});
  const error = ref(null);

  const fetchMovieById = async (id) => {
    await tmdb
      .getDetails(id)
      .then((response) => {
        movie.value = response.data;
      })
      .catch((err) => {
        error.value = err;
      });
  };

  return { movie, error, fetchMovieById };
};

export default getMovie;
