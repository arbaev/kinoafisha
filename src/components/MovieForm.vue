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
// import { api } from "boot/axios";
import { emitter } from "../boot/emitter";
// import { netError } from "helpers/ErrorHandle";
// import notify from "helpers/notify";

export default {
  name: "MovieForm",
  data() {
    return {
      movie1: "",
      movie2: "",
      movie3: "",
    };
  },
  methods: {
    submitForm() {
      emitter.emit("movieSubmitted", [this.movie1, this.movie2, this.movie3]);
    },
  },
};
</script>
