<script>
import { ref, watch } from "vue";
import { useKinoAfishaStore } from "@/stores/kinoAfishaStore";
import HeaderMain from "@/components/HeaderMain.vue";
import MovieForm from "@/components/MovieForm.vue";
import MovieList from "@/components/MovieList.vue";
import getMovie from "@/composables/getMovie";
import hideElementsForPrint from "@/composables/hideElementsForPrint";

export default {
  components: {
    HeaderMain,
    MovieForm,
    MovieList,
  },

  setup() {
    const kinoAfishaStore = useKinoAfishaStore();
    // TODO: Обработчик ошибок
    // TODO: Ошибка, когда отсутствует обложка (запрос taks) или фото актера (запрос 55555)
    // TODO: Анимации добавления/удаления
    // TODO: В хедере вместо текста выпадашки + about
    // TODO: Вывод результаты поиска и предлагать выбор
    // TODO: Подключить Пинию и внести туда стейты вместо эмитов
    // TODO: Перейти на скрипт сетап, сделать рефакторинг
    // TODO: Оформить ридми и репозиторий
    // TODO: Задеплоить
    const movies = ref([]);
    const recieveMovieNameText = (text) => {
      fetchMovie(text);
    };
    const { movie, error, fetchMovie } = getMovie();

    watch(movie, (movieData) => {
      // TODO: блокировка дублей фильмов. Лажово сделана: 1) надо блокировать до сетевого запроса 2) выводить уведомление о дубле
      if (!arrayContainsObject(movies, movie)) {
        movies.value.unshift(movieData);
      }
    });

    const arrayContainsObject = (arr, obj) => {
      return arr.value.some((item) => item.id === obj.value.id);
    };

    const recieveRemoveMovie = (movie) => {
      movies.value = movies.value.filter((m) => m.id !== movie.id);
    };

    hideElementsForPrint();

    return {
      movies,
      error,
      recieveMovieNameText,
      recieveRemoveMovie,
      kinoAfishaStore,
    };
  },
};
</script>

<template>
  <div>
    <div v-show="!kinoAfishaStore.isPrinting">
      <HeaderMain />
      <MovieForm @sendMovieName="recieveMovieNameText" class="my-6" />
    </div>
    <MovieList :movies="movies" @sendRemoveMovie="recieveRemoveMovie" />
  </div>
</template>

<style scoped></style>
