import axios from 'axios';

const getJobs = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_API_URL);
  return response.data;
};

export default getJobs;
