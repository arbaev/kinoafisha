<script>
import { ref } from "vue";

export default {
  emits: ["sendMovieName"],

  setup(props, { emit }) {
    const movieName = ref("");

    const submitMovieName = () => {
      emit("sendMovieName", movieName.value);
      movieName.value = "";
    };

    return {
      movieName,
      submitMovieName,
    };
  },
};
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <form @submit.prevent="submitMovieName" class="mt-6 flex">
      <label for="moviename" class="sr-only">Input movie</label>
      <input
        v-model="movieName"
        type="text"
        name="moviename"
        id="moviename"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="type movie name or id or url"
      />
      <button
        type="submit"
        class="ml-4 flex-shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add to poster
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
