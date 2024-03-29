<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <h1 v-if="displayedJobs.length === 0">No jobs for selected filters</h1>
    <ol v-else>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import JobListing from './JobListing.vue';
import { useJobsStore } from '@/stores/jobs';

import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages';
import { useDegreeStore } from '@/stores/degrees';

const jobsStore = useJobsStore();
const degreeStore = useDegreeStore();
onMounted(jobsStore.FETCH_JOBS);
onMounted(degreeStore.FETCH_DEGREES);

const route = useRoute();
const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || '1')
);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
</script>
