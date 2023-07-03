<template>
  <div class="mx-auto max-w-2xl">
    <form @submit.prevent="submitSearchString" class="mt-6 flex">
      <label for="searсh" class="sr-only">Input movie</label>
      <input
        v-model="searchString"
        type="text"
        name="search"
        id="moviename"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="type movie name or TheMovieDB movie id or TheMovieDB url"
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

<script setup>
import { ref } from "vue";
import { useKinoAfishaStore } from "@/stores/kinoAfishaStore";
const kinoAfishaStore = useKinoAfishaStore();

const searchString = ref("");

const submitSearchString = () => {
  kinoAfishaStore.setSearchString(searchString.value);
  searchString.value = "";
};
</script>
