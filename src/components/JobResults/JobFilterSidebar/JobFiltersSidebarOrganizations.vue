<template>
  <collapsable-accordion header="Organization">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="VueTube" type="checkbox" class="mr-3" />
            <label for="VueTube">VueTube</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Vue and Me" type="checkbox" class="mr-3" />
            <label for="Vue and Me">Vue and Me</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Et Vue Brute" type="checkbox" class="mr-3" />
            <label for="Et Vue Brute">Et Vue Brute</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Vue and a Half Men" type="checkbox" class="mr-3" />
            <label for="Vue and a Half Men">Vue and a Half Men</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsable-accordion>
</template>

<script>
import CollapsableAccordion from '../../Shared/CollapsableAccordion.vue';

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: {
    CollapsableAccordion,
  },
};
</script>
