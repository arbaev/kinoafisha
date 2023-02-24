<template>
  <div class="row justify-start items-start moviecard">
    <div class="poster">
      <div class="poster-wrapper">
        <q-img
          :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
          :alt="movie.original_title"
          class="poster-image"
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
        <q-item
          v-for="person in cast.slice(0, 3)"
          :key="person.id"
          class="q-mb-sm q-pl-none"
        >
          <q-item-section avatar>
            <q-avatar rounded>
              <q-img
                :src="
                  'https://image.tmdb.org/t/p/w66_and_h66_face' +
                  person.profile_path
                "
              >
                <template v-slot:error></template>
              </q-img>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{ person.name }}</q-item-label>
            <q-item-label caption lines="1">{{
              person.character
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <section style="display: none">
        <div class="text-subtitle1">В главных ролях</div>
        <div class="row justify-start">
          <q-card
            class="cast my-card q-mr-md"
            v-for="actor in cast.slice(0, 3)"
            :key="actor.id"
          >
            <img
              :src="
                'https://image.tmdb.org/t/p/w138_and_h175_face' +
                actor.profile_path
              "
              :alt="actor.name"
            />

            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-bold">{{
                    actor.name
                  }}</q-item-label>
                  <q-item-label caption>{{ actor.character }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { tmdb } from "boot/axios";
import { netError } from "../helpers/ErrorHandle";

const joblist = [
  { name_en: "Director", name_rus: "Режиссёр" },
  { name_en: "Screenplay", name_rus: "Сценарист" },
  { name_en: "Director of Photography", name_rus: "Оператор-постановщик" },
];

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
    setCrewMain() {
      this.crewMain = joblist.reduce((acc, job) => {
        let person = this.crew.find((p) => p.job === job.name_en);
        if (person) {
          person["job_rus"] = job.name_rus;
          acc.push(person);
        }

        return acc;
      }, []);
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
  margin: 20px;
  border-bottom: #aaa solid 1px;
  padding-bottom: 20px;
}
.poster-image {
  display: block;
  min-width: 158px;
  width: 158px;

  position: relative;
  top: 0;
  left: 0;
  border-radius: 4px;
}
// .poster {
//   min-width: 300px;
//   width: 300px;
//   height: 450px;
// }
// .poster-wrapper {
//   border-width: 0px;
//   min-width: 300px;
//   width: 300px;
//   height: 450px;
// }
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
.my-card {
  width: 130px;
}
</style>
