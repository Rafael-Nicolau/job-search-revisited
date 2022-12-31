import axios from 'axios';
import type { Job } from './types';

const getJobs = async () => {
  const response = await axios.get<Job[]>(import.meta.env.VITE_APP_API_URL);
  return response.data;
};

export default getJobs;
