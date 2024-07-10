export type TCurrentWeather = {
  localTime: {
    date: string;
    time: string;
  };
  temperature: number;
  weatherCode: number;
  description: string;
  windSpeed: number;
  isDay: boolean;
  units: {
    temperature: string;
    speed: string;
  };
};

export type THourlyWeather = {
  hour: string;
  temperature: number;
  weatherCode: number;
  description: string;
  windSpeed: number;
  isDay: boolean;
  units: {
    temperature: string;
    speed: string;
  };
};

export type TDailyWeather = {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weatherCode: number;
  description: string;
  units: {
    minTemperature: string;
    maxTemperature: string;
  };
};
