<template>
  <q-page class="flex">
    <movie-card :movie_id="movie_id" v-for="movie_id in ids" :key="movie_id" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import MovieCard from "components/MovieCard.vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      loading: false,
      ids: [717980, 785084, 640146, 631842],
    };
  },
  components: {
    MovieCard,
  },
  created() {},
  methods: {},
});
</script>
<style lang="scss"></style>
