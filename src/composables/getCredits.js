import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getCredits = () => {
  const cast = ref("");
  const crew = ref("");
  const error = ref(null);

  const fetchMovieCredits = async (id) => {
    try {
      const response = await tmdb.getCredits(id);
      crew.value = response.data.crew;
      cast.value = response.data.cast;
    } catch (err) {
      return (error.value = err.message);
    }
  };

  return { cast, crew, error, fetchMovieCredits };
};

export default getCredits;
