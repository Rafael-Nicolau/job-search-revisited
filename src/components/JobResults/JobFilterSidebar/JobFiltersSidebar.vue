<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <job-filters-sidebar-prompt />

      <job-filters-sidebar-skills />

      <collapsable-accordion header="Degrees">
        <job-filters-sidebar-degrees />
      </collapsable-accordion>

      <collapsable-accordion header="Job Types">
        <job-filters-sidebar-job-types />
      </collapsable-accordion>

      <collapsable-accordion header="Organizations">
        <job-filters-sidebar-organizations />
      </collapsable-accordion>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

import CollapsableAccordion from '@/components/Shared/CollapsableAccordion.vue';
import JobFiltersSidebarDegrees from './JobFiltersSidebarDegrees.vue';
import JobFiltersSidebarJobTypes from './JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarOrganizations from './JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarPrompt from './JobFiltersSidebarPrompt.vue';
import JobFiltersSidebarSkills from './JobFiltersSidebarSkills.vue';

const route = useRoute();
const userStore = useUserStore();

const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || '';
  userStore.UPDATE_SKILLS_SEARCH_TERM(role);
};

onMounted(parseSkillsSearchTerm);
</script>
