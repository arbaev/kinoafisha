<template>
  <div class="mt-4 text-md text-gray-600">
    <p>
      Создайте краткую информацию о фильмах. Идеально для распечатки по три
      фильма на страницу.
    </p>
    <ul class="list-disc">
      <li>
        Информация о фильмах берётся с
        <a
          href="https://www.themoviedb.org/"
          class="text-blue-500 hover:text-blue-800"
          target="_blank"
          >themoviedb.org</a
        >
      </li>
      <li>
        В строку поиска можно ввести название фильма или url фильма с themoviedb
        или просто id фильма оттуда
      </li>
      <li>Фильм можно удалить, нажав на крестик в правом верхнем углу</li>
      <li>Порядок фильмов можно менять перетаскиванием</li>
      <li>При распечатывании элементы интерфейса скрываются</li>
    </ul>
  </div>
</template>
