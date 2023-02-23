<template>
  <q-page class="flex flex-center">
    {{ movie }}
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
    };
  },
  created() {
    this.fetchMovie();
  },
  methods: {
    fetchMovie(movie_id) {
      this.loading = true;

      tmdb
        .getDetails("631842")
        .then((response) => {
          this.movie = response.data;
        })
        .catch((err) => netError(err))
        .finally(() => (this.loading = false));
    },
  },
});
</script>
