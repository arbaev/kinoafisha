import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getCredits = () => {
  const cast = ref("");
  const crew = ref("");
  const error = ref(null);

  const fetchMovieCredits = async (id) => {
    try {
      const response = await tmdb.getCredits(id).catch((err) => {
        error.value = err;
      });
      crew.value = response.data.crew;
      cast.value = response.data.cast;
    } catch (err) {
      console.log(err);
    }
  };

  return { cast, crew, error, fetchMovieCredits };
};

export default getCredits;
