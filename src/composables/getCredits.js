// запрос на актёров и создателей фильма по его id
import { ref } from "vue";
import { tmdb } from "@/boot/axios";

const getCredits = () => {
  const cast = ref("");
  const crew = ref("");
  const error = ref(null);

  const fetchMovieCredits = async (id) => {
    await tmdb
      .getCredits(id)
      .then((response) => {
        crew.value = response.data.crew;
        cast.value = response.data.cast;
      })

      .catch((err) => {
        error.value = err;
      });
  };

  return { cast, crew, error, fetchMovieCredits };
};

export default getCredits;
