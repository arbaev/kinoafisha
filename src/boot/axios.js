import axios from "axios";

const adapter = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "ru-RU",
  },
});

const tmdb = {
  getDetails: (movie_id) => adapter.get(`/movie/${movie_id}`),
  getCredits: (movie_id) => adapter.get(`/movie/${movie_id}/credits`),
  getPerson: (person_id) => adapter.get(`/person/${person_id}`),
  searchMovies: (query) =>
    adapter.get(`/search/movie`, { params: { query: query } }),
};

export { tmdb };
