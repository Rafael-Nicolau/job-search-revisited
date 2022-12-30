<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const spotlights = ref([]);

const getSpotlights = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_API_SPOT);
  spotlights.value = response.data;
};

onMounted(getSpotlights);
</script>
