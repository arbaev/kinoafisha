import { defineStore } from "pinia";

export const useKinoAfishaStore = defineStore("kinoAfisha", {
  state: () => ({
    isPrinting: false,
  }),
  actions: {
    setIsPrinting(bool) {
      this.isPrinting = bool;
    },
  },
});
