<template>
  <div>
    <div v-show="!kinoAfishaStore.isPrinting">
      <HeaderMain />
      <AboutTabs />
      <MovieForm class="my-6" />
      <div v-if="errors" class="mx-auto max-w-2xl">
        <AlertMessage :errors="errors" />
      </div>
    </div>
    <SearchList :movies="searchResults" @searchSelect="movieSelected" />
    <MovieList :movies="kinoAfishaStore.movies" />
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import { useKinoAfishaStore } from "@/stores/kinoAfishaStore";
import HeaderMain from "@/components/HeaderMain.vue";
import AboutTabs from "@/components/About/Tabs.vue";
import MovieForm from "@/components/MovieForm.vue";
import MovieList from "@/components/MovieList.vue";
import SearchList from "@/components/SearchList.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import getSearch from "@/composables/getSearch";
import getMovie from "@/composables/getMovie";
import hideElementsForPrint from "@/composables/hideElementsForPrint";

const kinoAfishaStore = useKinoAfishaStore();

const errors = ref([]);
const { movie, error: getMovieError, fetchMovieById } = getMovie();
const { searchResults, error: getSearchError, searchMovie } = getSearch();

// сбор ошибок из композаблов в одну кучу
watchEffect(() => {
  errors.value = [getMovieError.value, getSearchError.value].filter(
    (error) => !!error
  );
});

// в сторе обновляется строка инпута поиска — запрашиваем фильм или поиск
watch(
  () => kinoAfishaStore.searchString,
  (inputString) => {
    if (inputString === "") return;
    resetErrors();
    if (inputString.toLowerCase().includes("themoviedb.org")) {
      const id = extractTMDBId(inputString);
      fetchMovieById(id);
    } else if (isInteger(inputString)) {
      fetchMovieById(inputString);
    } else {
      searchMovie(inputString);
    }
  }
);

const extractTMDBId = (str) => {
  return /\/movie\/([\d]+?)\-/g.exec(str)[1];
};

const isInteger = (str) => {
  return /^\d+$/.test(str);
};

// загрузился фильм — добавляем его в список фильмов в сторе
watch(movie, (movieData) => {
  kinoAfishaStore.addMovie(movieData);
});

// обновился список поиска — включаем модальное окно
watch(searchResults, (searchData) => {
  kinoAfishaStore.setSearchString("");

  if (searchData.length === 1) {
    fetchMovieById(searchData[0].id);
  } else if (searchData.length === 0) {
    errors.value.push({ name: "SearchError", message: "Nothing found!" });
  } else {
    kinoAfishaStore.toggleShowSearchModal();
  }
});

const movieSelected = (movieData) => {
  fetchMovieById(movieData.id);
};

const resetErrors = () => {
  errors.value = [];
};

// скрываем элементы интерфейса при печати
hideElementsForPrint();
</script>
