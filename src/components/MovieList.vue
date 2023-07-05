<template>
  <draggable
    :list="movies"
    item-key="id"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <MovieCard :movie="element" />
    </template>
  </draggable>
</template>

<script setup>
import { ref, defineProps } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import draggable from "vuedraggable";

const props = defineProps({
  movies: {
    type: Object,
    required: true,
  },
});

const dragging = ref(false);
</script>
