<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script setup lang="ts">
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue';
import { useUserStore } from '@/stores/user';
import { useDegreeStore } from '@/stores/degrees';
import { computed } from 'vue';

const userStore = useUserStore();
const degreeStore = useDegreeStore();
const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES);
</script>
