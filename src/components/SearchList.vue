<template>
  <TransitionRoot as="template" :show="kinoAfishaStore.showSearchModal">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 py-4 sm:p-6 sm:pb-4">
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >Выберите фильм</DialogTitle
                  >
                  <div class="mt-2">
                    <div class="flex flex-col space-y-1">
                      <div v-for="m in movies" :key="m.id">
                        <button
                          @click="emitSearchSelect(m)"
                          type="button"
                          class="w-full rounded bg-sky-50 px-2 py-1 text-sm font-semibold text-sky-600 hover:bg-sky-100"
                        >
                          <div class="flex flex-row justify-between">
                            <div>
                              {{ m.title }}
                            </div>
                            <div>{{ releaseYear(m.release_date) }}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits, onBeforeMount } from "vue";
import { useKinoAfishaStore } from "@/stores/kinoAfishaStore";
const kinoAfishaStore = useKinoAfishaStore();

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["searchSelect"]);

const emitSearchSelect = (m) => {
  kinoAfishaStore.setShowSearchModal(false);
  emits("searchSelect", m);
};

const releaseYear = (release_date) => {
  if (release_date === "") {
    return "";
  } else {
    const date = new Date(release_date);
    const year = date.toLocaleDateString("ru-RU", {
      year: "numeric",
    });
    return `(${year})`;
  }
};

// close modal if ESC pressed
const handleEscape = onBeforeMount((event) => {
  if (event?.key === "Escape") {
    kinoAfishaStore.setShowSearchModal(false);
  }
});
window.addEventListener("keydown", handleEscape);
</script>
