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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >Выберите фильм</DialogTitle
                  >
                  <div class="mt-2">
                    <ol>
                      <li v-for="m in movies" :key="m.id">
                        <button @click="emitSearchSelect(m)">
                          <strong>{{ m.title }}</strong> ({{ m.release_date }})
                        </button>
                      </li>
                    </ol>
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
import { defineProps, defineEmits } from "vue";
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
  kinoAfishaStore.toggleShowSearchModal();
  emits("searchSelect", m);
};
</script>
