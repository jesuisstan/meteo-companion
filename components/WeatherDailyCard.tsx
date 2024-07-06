import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { C42_ORANGE_DARK, C42_VIOLET_DARK } from '@/style/Colors';
import { getWeatherIcon } from '@/utils/handle-weather-condition';

type TWeatherDailyCardProps = {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
  description: string;
  units: {
    minTemperature: string;
    maxTemperature: string;
  };
  style?: object;
};

const WeatherDailyCard = ({
  date,
  maxTemperature,
  minTemperature,
  weatherCode,
  description,
  units,
  style
}: TWeatherDailyCardProps) => {
  return (
    <View style={[styles.weather, style]}>
      <ThemedText type="subtitle">{date}</ThemedText>

      <View style={styles.weatherDescription}>
        {getWeatherIcon(weatherCode)}
        <ThemedText type="default">{description}</ThemedText>
      </View>

      <ThemedText type="title" style={{ color: C42_ORANGE_DARK }}>
        {maxTemperature} {units.maxTemperature} max
      </ThemedText>
      <ThemedText type="title" style={{ color: C42_VIOLET_DARK }}>
        {minTemperature} {units.minTemperature} min
      </ThemedText>
    </View>
  );
};

export default WeatherDailyCard;

const styles = StyleSheet.create({
  weather: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 21
  },
  weatherDescription: {
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
