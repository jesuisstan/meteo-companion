import axios from 'axios';
import { Alert } from 'react-native';

import {
  TCurrentWeather,
  THourlyWeather,
  TDailyWeather
} from '@/types/weather-types';

const weatherDescriptions: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: Moderate',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Slight',
  63: 'Rain: Moderate',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Slight',
  73: 'Snow fall: Moderate',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Slight',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers: Slight',
  86: 'Snow showers: Heavy',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

export const fetchWeather = async (latitude: number, longitude: number) => {
  const url = `https://api.open-meteo.com/v1/forecast`;
  const params = {
    latitude: latitude, // The latitude of the location for which to fetch the weather data
    longitude: longitude, // The longitude of the location for which to fetch the weather data
    hourly: 'temperature_2m,windspeed_10m,weathercode', // List of hourly weather variables to include in the response
    daily: 'temperature_2m_max,temperature_2m_min,weathercode', // List of daily weather variables to include in the response
    current_weather: true // Boolean flag to include the current weather data in the response

    // (!) Do not provide timezone to get data for today in UTC; uncomment to get data starting at 00:00 local time
    //timezone: 'auto' // Automatically adjust the response based on the location's timezone
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    // Current Weather
    const currentWeather: TCurrentWeather = {
      temperature: data.current_weather.temperature,
      description: weatherDescriptions[data.current_weather.weathercode],
      windSpeed: data.current_weather.windspeed,
      units: {
        temperature: data.current_weather_units.temperature,
        speed: data.current_weather_units.windspeed
      }
    };

    // Today's Weather (only hourly data for today)
    const today = new Date().toISOString().slice(0, 10); // Today's date in YYYY-MM-DD format
    const hourlyWeather: THourlyWeather[] = data.hourly.time.reduce(
      (acc: THourlyWeather[], time: string, index: number) => {
        if (time.startsWith(today)) {
          acc.push({
            hour: time.slice(11, 16), // Extracting HH:MM from ISO timestamp
            temperature: data.hourly.temperature_2m[index],
            description: weatherDescriptions[data.hourly.weathercode[index]],
            windSpeed: data.hourly.windspeed_10m[index],
            units: {
              temperature: data.hourly_units.temperature_2m,
              speed: data.hourly_units.windspeed_10m
            }
          });
        }
        return acc;
      },
      []
    );

    // Weekly Weather
    const dailyWeather: TDailyWeather[] = data.daily.time.map(
      (time: string, index: number) => ({
        date: time,
        minTemperature: data.daily.temperature_2m_min[index],
        maxTemperature: data.daily.temperature_2m_max[index],
        description: weatherDescriptions[data.daily.weathercode[index]],
        units: {
          minTemperature: data.daily_units.temperature_2m_min,
          maxTemperature: data.daily_units.temperature_2m_max
        }
      })
    );
    return { currentWeather, hourlyWeather, dailyWeather };
  } catch (error) {
    Alert.alert('Oops!', 'Failed to fetch weather data.');
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
