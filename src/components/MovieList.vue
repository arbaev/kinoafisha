<script>
import { ref } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import draggable from "vuedraggable";

export default {
  props: ["movies"],
  components: { MovieCard, draggable },
  setup(props, { emit }) {
    const dragging = ref(false);

    const recieveRemoveMovie = (movie) => {
      // TODO: Эту цепочку эмитов надо заменить на центральное состояние
      emit("sendRemoveMovie", movie);
    };

    return { dragging, recieveRemoveMovie };
  },
};
</script>

<template>
  <div>
    <draggable
      :list="movies"
      item-key="id"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <MovieCard :movie="element" @sendRemoveMovie="recieveRemoveMovie" />
      </template>
    </draggable>
  </div>
</template>

<style lang="scss" scoped></style>
