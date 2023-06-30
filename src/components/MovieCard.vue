<script>
export default {
  props: ["movie"],
  setup(props) {},
};
</script>

<template>
  <div class="border border-dashed border-red-500">
    movie card
    <h2>{{ movie.title }}</h2>
    <div>{{ movie.release_date.substring(4, 0) }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
