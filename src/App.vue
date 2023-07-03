<template>
  <div>
    <div v-show="!kinoAfishaStore.isPrinting">
      <HeaderMain />
      <MovieForm class="my-6" />
    </div>
    <MovieList :movies="kinoAfishaStore.movies" />
  </div>
</template>

<script setup>
// TODO: Обработчик ошибок
// TODO: Ошибка, когда отсутствует обложка (запрос taks) или фото актера (запрос 55555)
// TODO: Анимации добавления/удаления
// TODO: В хедере вместо текста выпадашки + about
// TODO: Вывод результаты поиска и предлагать выбор
// TODO: Оформить ридми и репозиторий
// TODO: Задеплоить
import { watch } from "vue";
import { useKinoAfishaStore } from "@/stores/kinoAfishaStore";
import HeaderMain from "@/components/HeaderMain.vue";
import MovieForm from "@/components/MovieForm.vue";
import MovieList from "@/components/MovieList.vue";
import getMovie from "@/composables/getMovie";
import hideElementsForPrint from "@/composables/hideElementsForPrint";

const kinoAfishaStore = useKinoAfishaStore();

const { movie, error, fetchMovie } = getMovie();

// в сторе появляется строка инпута поиска — грузим фильм
watch(
  () => kinoAfishaStore.searchString,
  (str) => {
    fetchMovie(str);
  }
);

// загрузился фильм — добавляем его в список фильмов в сторе
watch(movie, (movieData) => {
  kinoAfishaStore.addMovie(movieData);
});

// скрываем элементы интерфейса при печати
hideElementsForPrint();
</script>
