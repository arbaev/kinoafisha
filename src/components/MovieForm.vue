<template>
  <h5 class="text-center">
    Введите URL фильма или его id из TheMovieDB<br />
    или просто название фильма
  </h5>
  <div class="row justify-center">
    <div class="col-6">
      <section>
        <q-form
          @submit.prevent="submitForm"
          no-error-focus
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          class="q-mt-sm"
        >
          <q-input
            outlined
            required
            v-model="movie1"
            label="Кино 1"
            class="q-mb-sm"
          />
          <q-input
            outlined
            required
            v-model="movie2"
            label="Кино 2"
            class="q-mb-sm"
          />
          <q-input outlined required v-model="movie3" label="Кино 3" />

          <div class="row justify-end q-mt-lg">
            <q-space />
            <q-btn label="Показать афишу" type="submit" color="primary" />
          </div>
        </q-form>
      </section>
    </div>
  </div>
</template>

<script>
import { tmdb } from "boot/axios";
import { ref } from "vue";
import { emitter } from "../boot/emitter";
import { netError } from "../helpers/ErrorHandle";

export default {
  name: "MovieForm",
  data() {
    return {
      loading: false,
      movie1: "",
      movie2: "",
      movie3: "",
      ids: ref([]),
    };
  },
  methods: {
    async submitForm() {
      this.ids = await this.getMovieIds();
      emitter.emit("movieSubmitted", this.ids);
    },
    async getMovieIds() {
      return await Promise.all(
        [this.movie1, this.movie2, this.movie3].map(async (m) => {
          if (Number(m)) {
            return +m;
          } else if (
            m.slice(0, 7) === "https:/" ||
            m.slice(0, 7) === "http://"
          ) {
            return /\/movie\/([\d]+?)\-/g.exec(m)[1];
          } else {
            const res = await this.movieSearch(m);
            return res.data.results[0].id;
          }
        })
      );
    },
    movieSearch(query) {
      try {
        return tmdb.searchMovies(query);
      } catch (err) {
        netError(err);
      }
    },
  },
};
</script>
