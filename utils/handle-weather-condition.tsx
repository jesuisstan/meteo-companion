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

// Groups of weather conditions and their representative codes
const weatherConditionGroups: { [key: number]: { iconSet: any, iconName: string, size: number, color: string } } = {
  0: { iconSet: Ionicons, iconName: 'sunny', size: 50, color: C42_GREEN_DARK },                         // Clear sky
  1: { iconSet: Ionicons, iconName: 'partly-sunny-outline', size: 50, color: C42_GREEN_DARK },          // Mainly clear, partly cloudy, overcast
  2: { iconSet: Ionicons, iconName: 'partly-sunny', size: 50, color: C42_GREEN_DARK },                  // Partly cloudy
  3: { iconSet: Fontisto, iconName: 'cloudy', size: 50, color: C42_TEXT },                              // Overcast
  45: { iconSet: MaterialCommunityIcons, iconName: 'weather-fog', size: 50, color: C42_GREY_DARK },     // Fog
  48: { iconSet: MaterialCommunityIcons, iconName: 'weather-fog', size: 50, color: C42_GREY_DARK },     // Depositing rime fog
  51: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT },                       // Drizzle: Light
  53: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT },                       // Drizzle: Moderate
  55: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_TEXT },                       // Drizzle: Dense intensity
  56: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_VIOLET_DARK },                // Freezing Drizzle: Light
  57: { iconSet: Feather, iconName: 'cloud-drizzle', size: 50, color: C42_VIOLET_DARK },                // Freezing Drizzle: Dense intensity
  61: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT },                      // Rain: Slight
  63: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT },                      // Rain: Moderate
  65: { iconSet: Ionicons, iconName: 'rainy-outline', size: 50, color: C42_TEXT },                      // Rain: Heavy intensity
  66: { iconSet: Feather, iconName: 'rainy-sharp', size: 50, color: C42_VIOLET_DARK },                  // Freezing Rain: Light
  67: { iconSet: Feather, iconName: 'rainy-sharp', size: 50, color: C42_VIOLET_DARK },                  // Freezing Rain: Heavy intensity
  71: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT },                          // Snow fall: Slight
  73: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT },                          // Snow fall: Moderate
  75: { iconSet: Feather, iconName: 'cloud-snow', size: 50, color: C42_TEXT },                          // Snow fall: Heavy intensity
  77: { iconSet: Ionicons, iconName: 'snow', size: 50, color: C42_TEXT },                               // Snow grains
  80: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK },                       // Rain showers: Slight
  81: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK },                       // Rain showers: Moderate
  82: { iconSet: Fontisto, iconName: 'rains', size: 50, color: C42_VIOLET_DARK },                       // Rain showers: Violent
  85: { iconSet: MaterialCommunityIcons, iconName: 'weather-snowy-heavy', size: 50, color: C42_TEXT },  // Snow showers: Slight
  86: { iconSet: MaterialCommunityIcons, iconName: 'weather-snowy-heavy', size: 50, color: C42_TEXT },  // Snow showers: Heavy
  95: { iconSet: Feather, iconName: 'cloud-lightning', size: 50, color: C42_ORANGE_DARK },              // Thunderstorm: Slight or moderate
  96: { iconSet: Ionicons, iconName: 'thunderstorm', size: 50, color: C42_ORANGE_DARK },                // Thunderstorm with slight hail
  99: { iconSet: Ionicons, iconName: 'thunderstorm', size: 50, color: C42_ORANGE_DARK }                 // Thunderstorm with heavy hail
};

// Function to get the icon JSX element based on the weather condition code
export const getWeatherIcon = (weatherCode: number): JSX.Element => {
  // Check if the weather code exists in weatherConditionGroups
  if (weatherConditionGroups[weatherCode]) {
    const { iconSet, iconName, size, color } = weatherConditionGroups[weatherCode];
    return React.createElement(iconSet, { name: iconName, size, color });
  } else {
    // Return default icon if weather code is undefined or unexisting
    return <MaterialCommunityIcons name="cloud-question" size={50} color={C42_TEXT} />
  }
};
