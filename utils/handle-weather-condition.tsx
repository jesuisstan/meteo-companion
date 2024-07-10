import React from 'react';
import { Ionicons, Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { C42_GREEN_DARK, C42_GREY_DARK, C42_ORANGE_DARK, C42_TEXT, C42_VIOLET_DARK } from '@/style/Colors';

export const weatherDescriptions: { [key: number]: string } = {
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

// Groups of weather conditions and their representative codes for day and night
const weatherConditionGroups: { [key: number]: { day: any, night: any } } = {
  0: { day: { iconSet: Ionicons, iconName: 'sunny', size: 50, color: C42_GREEN_DARK }, night: { iconSet: Ionicons, iconName: 'moon', size: 50, color: C42_GREEN_DARK } },  // Clear sky
  1: { day: { iconSet: Ionicons, iconName: 'partly-sunny-outline', size: 50, color: C42_GREEN_DARK }, night: { iconSet: Ionicons, iconName: 'cloudy-night-outline', size: 50, color: C42_GREEN_DARK } },  // Mainly clear, partly cloudy, overcast
  2: { day: { iconSet: Ionicons, iconName: 'partly-sunny', size: 50, color: C42_GREEN_DARK }, night: { iconSet: Ionicons, iconName: 'cloudy-night', size: 50, color: C42_GREEN_DARK } },  // Partly cloudy
  3: { day: { iconSet: Fontisto, iconName: 'cloudy', size: 50, color: C42_TEXT }, night: { iconSet: Fontisto, iconName: 'night-alt-cloudy', size: 50, color: C42_TEXT } },  // Overcast
  45: { day: { iconSet: MaterialCommunityIcons, iconName: 'weather-fog', size: 50, color: C42_GREY_DARK }, night: { iconSet: MaterialCommunityIcons, iconName: 'weather-fog', size: 50, color: C42_GREY_DARK } },  // Fog
  48: { day: { iconSet: MaterialCommunityIcons, iconName: 'weather-fog', size: 50, color: C42_GREY_DARK }, night: { iconSet: MaterialCommunityIcons, iconName: 'weather-fog', size: 50, color: C42_GREY_DARK } },  // Depositing rime fog
  51: { day: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT }, night: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT } },  // Drizzle: Light
  53: { day: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT }, night: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT } },  // Drizzle: Moderate
  55: { day: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT }, night: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT } },  // Drizzle: Dense intensity
  56: { day: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_VIOLET_DARK }, night: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_VIOLET_DARK } },  // Freezing Drizzle: Light
  57: { day: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_VIOLET_DARK }, night: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_VIOLET_DARK } },  // Freezing Drizzle: Dense intensity
  61: { day: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT }, night: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT } },  // Rain: Slight
  63: { day: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT }, night: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT } },  // Rain: Moderate
  65: { day: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT }, night: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT } },  // Rain: Heavy intensity
  66: { day: { iconSet: Feather, iconName: 'rainy-sharp', size: 50, color: C42_VIOLET_DARK }, night: { iconSet: Feather, iconName: 'rainy-sharp', size: 50, color: C42_VIOLET_DARK } },  // Freezing Rain: Light
  67: { day: { iconSet: Feather, iconName: 'rainy-sharp', size: 50, color: C42_VIOLET_DARK }, night: { iconSet: Feather, iconName: 'rainy-sharp', size: 50, color: C42_VIOLET_DARK } },  // Freezing Rain: Heavy intensity
  71: { day: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT }, night: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT } },  // Snow fall: Slight
  73: { day: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT }, night: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT } },  // Snow fall: Moderate
  75: { day: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT }, night: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT } },  // Snow fall: Heavy intensity
  77: { day: { iconSet: Ionicons, iconName: 'snow', size: 50, color: C42_TEXT }, night: { iconSet: Ionicons, iconName: 'snow', size: 50, color: C42_TEXT } },  // Snow grains
  80: { day: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK }, night: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK } },  // Rain showers: Slight
  81: { day: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK }, night: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK } },  // Rain showers: Moderate
  82: { day: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK }, night: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK } },  // Rain showers: Violent
  85: { day: { iconSet: MaterialCommunityIcons, iconName: 'weather-snowy-heavy', size: 50, color: C42_TEXT }, night: { iconSet: MaterialCommunityIcons, iconName: 'weather-snowy-heavy', size: 50, color: C42_TEXT } },  // Snow showers: Slight
  86: { day: { iconSet: MaterialCommunityIcons, iconName: 'weather-snowy-heavy', size: 50, color: C42_TEXT }, night: { iconSet: MaterialCommunityIcons, iconName: 'weather-snowy-heavy', size: 50, color: C42_TEXT } },  // Snow showers: Heavy
  95: { day: { iconSet: Feather, iconName: 'cloud-lightning', size: 50, color: C42_ORANGE_DARK }, night: { iconSet: Feather, iconName: 'cloud-lightning', size: 50, color: C42_ORANGE_DARK } },  // Thunderstorm: Slight or moderate
  96: { day: { iconSet: Ionicons, iconName: 'thunderstorm', size: 50, color: C42_ORANGE_DARK }, night: { iconSet: Ionicons, iconName: 'thunderstorm', size: 50, color: C42_ORANGE_DARK } },  // Thunderstorm with slight hail
  99: { day: { iconSet: Ionicons, iconName: 'thunderstorm', size: 50, color: C42_ORANGE_DARK }, night: { iconSet: Ionicons, iconName: 'thunderstorm', size: 50, color: C42_ORANGE_DARK } }  // Thunderstorm with heavy hail
};

// Function to get the icon JSX element based on the weather condition code and isDay
export const getWeatherIcon = (weatherCode: number, isDay?: boolean): JSX.Element => {
  const timeOfDay = isDay !== undefined ? (isDay ? 'day' : 'night') : 'day';
  const weatherGroup = weatherConditionGroups[weatherCode];

  if (weatherGroup) {
    const { iconSet, iconName, size, color } = weatherGroup[timeOfDay];
    return React.createElement(iconSet, { name: iconName, size, color });
  } else {
    // Return default icon if weather code is undefined or unexisting
    return <MaterialCommunityIcons name="cloud-question" size={50} color={C42_TEXT} />;
  }
};
