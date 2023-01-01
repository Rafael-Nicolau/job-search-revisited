import axios from 'axios';
import type { Degree } from './types';

const getDegrees = async () => {
  const response = await axios.get<Degree[]>(
    import.meta.env.VITE_APP_API_DEGREES
  );
  return response.data;
};

export default getDegrees;
