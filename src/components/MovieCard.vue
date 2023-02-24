<template>
  <div class="row justify-start items-start moviecard">
    <div class="poster col-3">
      <div class="poster-wrapper">
        <q-img
          :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
          :alt="movie.original_title"
          :ratio="2 / 3"
        />
      </div>
    </div>
    <div class="info col">
      <div class="title">{{ movie.original_title }}</div>
      <div class="subtitle">{{ movie.title }}</div>
      <q-chip dense class="q-ml-none">
        <q-avatar icon="calendar_month" color="grey" text-color="white" />
        {{ releaseYear }}
      </q-chip>
      <q-chip dense>
        <q-avatar icon="schedule" color="grey" text-color="white" />
        {{ duration }}
      </q-chip>
      <q-chip dense v-for="gnr in movie.genres" :key="gnr.id">{{
        gnr.name
      }}</q-chip>

      <p class="overview">{{ movie.overview }}</p>

      <div class="row items-center q-gutter-x-sm">
        <q-item v-for="person in crewMain" :key="person.id" class="q-mb-sm">
          <q-item-section avatar>
            <q-avatar>
              <!-- <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" /> -->
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{ person.name }}</q-item-label>
            <q-item-label caption lines="1">{{ person.job }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="cast" v-for="actor in cast.slice(0, 3)" :key="actor.id">
        {{ actor.original_name }} as {{ actor.character }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { tmdb } from "boot/axios";
import { netError } from "../helpers/ErrorHandle";

export default defineComponent({
  name: "MovieCard",
  props: ["movie_id"],
  data() {
    return {
      loading: false,
      movie: {},
      crew: [],
      cast: [],
      crewMain: [],
    };
  },
  created() {
    this.fetchMovie(this.movie_id);
    this.fetchCredits(this.movie_id);
  },
  computed: {
    releaseYear() {
      let date = new Date(this.movie.release_date);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
      });
    },
    duration() {
      let hours = Math.trunc(this.movie.runtime / 60);
      let minutes = this.movie.runtime % 60;
      minutes = minutes.toString().length < 2 ? `0${minutes}` : minutes;

      return `${hours}:${minutes}`;
    },
  },
  methods: {
    setDirector() {
      return this.crew.find((p) => p.job === "Director") || "—";
    },
    setWriter() {
      return this.crew.find((p) => p.job === "Screenplay") || "—";
    },
    setCameraman() {
      return this.crew.find((p) => p.job === "Director of Photography") || "—";
    },
    setCrewMain() {
      this.crewMain = [
        this.setDirector(),
        this.setWriter(),
        this.setCameraman(),
      ];
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
          this.setCrewMain();
        })
        .catch((err) => netError(err))
        .finally(() => (this.loading = false));
    },
  },
});
</script>
<style lang="scss">
.b {
  border: 2px dashed red;
}
.moviecard {
  padding: 20px;
}
.poster-image {
  display: block;
  min-width: 300px;
  width: 300px;
  height: 450px;
  position: relative;
  top: 0;
  left: 0;
}
.poster-wrapper {
  border-width: 0px;
  min-width: 300px;
  width: 300px;
  height: 450px;
  border-radius: 3px;
}
.info {
  padding-left: 40px;
}
.title {
  font-size: 2em;
  font-weight: bold;
  color: #333;
  line-height: 1;
}
.subtitle {
  font-size: 1.25em;
  font-weight: bold;
  color: #666;
}
</style>
