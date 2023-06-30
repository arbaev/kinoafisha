import { ref } from "vue";
import { tmdb } from "../boot/axios";

const getMovie = (id) => {
  const movie = ref(null);
  const error = ref(null);

  const fetchMovie = async (id) => {
    try {
      const response = await tmdb.getDetails(id);
      movie.value = response.data;
    } catch (err) {
      return (error.value = err.message);
    }
  };

  return { movie, error, fetchMovie };
};

export default getMovie;
