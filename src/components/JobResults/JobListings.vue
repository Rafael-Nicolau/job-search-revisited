<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in jobs" :key="job.id" :job="job" />
    </ol>
  </main>
</template>

<script>
import axios from 'axios';
import JobListing from './JobListing.vue';
export default {
  name: 'JobListings',
  components: {
    JobListing,
  },
  data() {
    return {
      jobs: [],
    };
  },
  async mounted() {
    const response = await axios
      .get('http://localhost:3000/jobs')
      .catch((e) => {
        console.log(e + ' || Is json-server on?');
        this.jobs = ['error'];
      });
    this.jobs = response.data;
  },
};
</script>
