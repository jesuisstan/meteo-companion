import { createContext, useContext, useState, ReactNode, FC } from 'react';

import { fetchWeather } from '@/api/fetch-weather';
import {
  TCurrentWeather,
  THourlyWeather,
  TDailyWeather
} from '@/types/weather-types';

type WeatherContextType = {
  current: TCurrentWeather | null;
  hourly: THourlyWeather[] | null;
  daily: TDailyWeather[] | null;
  setCurrent: (current: TCurrentWeather) => void;
  setHourly: (hourly: THourlyWeather[]) => void;
  setDaily: (daily: TDailyWeather[]) => void;
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: FC<{ children: ReactNode }> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [current, setCurrent] = useState<TCurrentWeather | null>(null);
  const [hourly, setHourly] = useState<THourlyWeather[] | null>(null);
  const [daily, setDaily] = useState<TDailyWeather[] | null>(null);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const { currentWeather, hourlyWeather, dailyWeather } =
        await fetchWeather(latitude, longitude);
      setCurrent(currentWeather);
      setHourly(hourlyWeather);
      setDaily(dailyWeather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        current,
        hourly,
        daily,
        setCurrent,
        setHourly,
        setDaily,
        fetchWeatherData
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
