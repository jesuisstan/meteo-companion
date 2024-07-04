import axios from 'axios';

import { TCity } from '@/types/geo-types';

export const getCities = async (geo: string): Promise<TCity[]> => {
  const result = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${geo}`
  );
  return result?.data?.results;
};
