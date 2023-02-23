<template>
  <q-page class="flex flex-center">
    <section>
      <div class="row moviecard">
        <div class="poster col-4 b">
          <img
            class="poster-image"
            :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            :alt="movie.original_title"
          />
        </div>
        <div class="info col-8">
          <h2 class="title">{{ movie.original_title }}</h2>
          <h4 class="subtitle">{{ movie.title }}</h4>
          <p class="year">Год выпуска: {{ movie.release_date }}</p>
          <p class="genres">Жанры: {{ genres }}</p>
          <p class="runtime">Продолжительность: {{ movie.runtime }}</p>
          <p class="overview">{{ movie.overview }}</p>
          <div class="crew">
            <p>Режиссёр: {{ director.name }}</p>
            <p>Сценарий: {{ writer.name }}</p>
            <p>Оператор: {{ cameraman.name }}</p>
          </div>
          <div class="cast" v-for="actor in cast.slice(0, 3)" :key="actor.id">
            {{ actor.original_name }} as {{ actor.character }}
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { tmdb } from "boot/axios";
import { netError } from "../helpers/ErrorHandle";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      loading: false,
      movie: {},
      crew: [],
      cast: [],
      director: {},
      cameraman: {},
      writer: {},
    };
  },
  created() {
    this.fetchMovie(717980);
    this.fetchCredits(717980);
  },
  computed: {
    genres() {
      return this.movie.genres.reduce((a, g) => {
        a = a + " " + g.name;
        return a;
      }, "");
    },
  },
  methods: {
    setDirector() {
      this.director = this.crew.find((p) => p.job === "Director");
    },
    setWriter() {
      this.writer = this.crew.find((p) => p.job === "Screenplay");
    },
    setCameraman() {
      this.cameraman = this.crew.find(
        (p) => p.job === "Director of Photography"
      );
    },
    fetchMovie(movie_id) {
      this.loading = true;

      tmdb
        .getDetails(movie_id)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((err) => netError(err))
        .finally(() => (this.loading = false));
    },
    fetchCredits(movie_id) {
      this.loading = true;

      tmdb
        .getCredits(movie_id)
        .then((response) => {
          this.crew = response.data.crew;
          this.cast = response.data.cast;
          this.setDirector();
          this.setWriter();
          this.setCameraman();
        })
        .catch((err) => netError(err))
        .finally(() => (this.loading = false));
    },
  },
});
</script>
<style lang="scss">
.moviecard {
  padding: 20px;
}
.poster-image {
  max-width: 100%;
  max-height: 100%;
}
.info {
  padding: 0 0 0 20px;
}
.title {
  font-weight: bold;
  margin: 0;
}
.subtitle {
  font-weight: bold;
  font-size: 1.8em;
  margin: 0;
}
</style>
