<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>

      <job-filters-sidebar-organizations />
    </section>
  </div>
</template>

<script>
import ActionButton from '../../shared/ActionButton.vue';
import JobFiltersSidebarOrganizations from './JobFiltersSidebarOrganizations.vue';

export default {
  name: 'JobFiltersSidebar',
  components: { ActionButton, JobFiltersSidebarOrganizations },
};
</script>
