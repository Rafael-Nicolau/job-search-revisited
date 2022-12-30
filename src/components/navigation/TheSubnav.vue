<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span>
          jobs Matched</span
        >
      </div>
      <div v-else>
        <router-link :to="{ name: 'JobResults' }"
          ><span class="text-brand-blue-2">Go to Job Pages</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useJobsStore } from '@/stores/jobs';
import { computed } from 'vue';

const route = useRoute();

const jobsStore = useJobsStore();

const onJobResultsPage = computed(() => route.name === 'JobResults');
const FILTERED_JOBS = computed(() => {
  return jobsStore.FILTERED_JOBS;
});
</script>
