import { createContext, useContext, useState, ReactNode, FC } from 'react';

import { fetchWeather } from '@/utils/api/fetch-weather';
import {
  TCurrentWeather,
  THourlyWeather,
  TDailyWeather
} from '@/types/weather-types';
import shootAlert from '@/utils/shoot-alert';

type WeatherContextType = {
  current: TCurrentWeather | null;
  hourly: THourlyWeather[] | null;
  daily: TDailyWeather[] | null;
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const { currentWeather, hourlyWeather, dailyWeather } =
        await fetchWeather(latitude, longitude);
      setCurrent(currentWeather);
      setHourly(hourlyWeather);
      setDaily(dailyWeather);
    } catch (error) {
      setCurrent(null);
      setHourly(null);
      setCurrent(null);
      shootAlert('Error', 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        current,
        hourly,
        daily,
        loading,
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
