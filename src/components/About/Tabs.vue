<template>
  <div>
    <div class="container mx-auto">
      <div class="flex flex-row flex-nowrap justify-center">
        <div v-for="tab in tabContent" :key="tab.id" class="mx-8">
          <button
            @click="currentTabClick(tab.id)"
            class="py-0 px-5 border-sky-600 text-sky-600"
            :class="[
              tab.id === currentTab
                ? 'border-solid border-b-2'
                : 'border-dashed border-b',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      <div>
        <div v-if="currentTab !== 0" class="mx-auto max-w-2xl my-4">
          <div v-for="tab in tabContent" :key="tab.id">
            <TransitionEffect>
              <div v-show="currentTab === tab.id">
                <component :is="tab.component" />
              </div>
            </TransitionEffect>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AboutProject from "./Project.vue";
import WhatsThis from "./WhatsThis.vue";
import TransitionEffect from "@/components/TransitionEffect.vue";

const tabContent = [
  { id: 1, label: "Что это такое?", component: WhatsThis },
  { id: 2, label: "О проекте", component: AboutProject },
];

const currentTab = ref(0);
const currentTabClick = (tab_id) => {
  if (tab_id === currentTab.value) {
    currentTab.value = 0;
  } else {
    currentTab.value = tab_id;
  }
};
</script>
