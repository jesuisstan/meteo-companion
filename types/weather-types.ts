export type TCurrentWeather = {
  temperature: number;
  weatherCode: number;
  description: string;
  windSpeed: number;
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
