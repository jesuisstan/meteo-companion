import axios from 'axios';

import { TCity } from '@/types/geo-types';

export const getCities = async (cityName: string): Promise<TCity[]> => {
  const result = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
  );
  return result?.data?.results;
};
