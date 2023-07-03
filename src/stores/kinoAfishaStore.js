import { ref } from "vue";
import { defineStore } from "pinia";

export const useKinoAfishaStore = defineStore("kinoAfisha", () => {
  const isPrinting = ref(false);

  const setIsPrinting = (bool) => {
    isPrinting.value = bool;
  };

  return {
    isPrinting,
    setIsPrinting,
  };
});
