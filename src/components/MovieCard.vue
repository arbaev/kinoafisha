<script>
export default {
  emits: ["sendRemoveMovie"],

  props: ["movie"],
  setup(props, { emit }) {
    const removeMovie = () => {
      emit("sendRemoveMovie", props.movie);
    };

    return {
      removeMovie,
    };
  },
};
</script>

<template>
  <div class="border border-dashed border-red-500">
    movie card
    <h2>{{ movie.title }}</h2>
    <div>{{ movie.release_date.substring(4, 0) }}</div>
    <button @click="removeMovie">delete</button>
  </div>
</template>

<style lang="scss" scoped></style>
