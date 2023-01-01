<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computer Programming, Finance Degree"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const skillSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm;
  },
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value);
  },
});
</script>
