import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { ThemedText } from '@/components/ui/ThemedText';
import { C42_ORANGE_DARK, C42_TEXT, C42_VIOLET_DARK } from '@/style/Colors';
import { getWeatherIcon } from '@/utils/handle-weather-condition';

type TWeatherSingleCardProps = {
  temperature: number;
  weatherCode: number;
  description: string;
  windSpeed: number;
  units: {
    temperature: string;
    speed: string;
  };
};

const WeatherSingleCard = ({
  temperature,
  weatherCode,
  description,
  windSpeed,
  units
}: TWeatherSingleCardProps) => {
  return (
    <View style={styles.weather}>
      <ThemedText
        type="title"
        style={
          temperature <= 0
            ? { color: C42_VIOLET_DARK }
            : { color: C42_ORANGE_DARK }
        }
      >
        {temperature} {units.temperature}
      </ThemedText>

      <View style={styles.weatherDescription}>
        {getWeatherIcon(weatherCode)}
        <ThemedText type="default">{description}</ThemedText>
      </View>

      <View style={styles.wind}>
        <Feather name="wind" size={30} color={C42_TEXT} />
        <ThemedText type="subtitle">
          {windSpeed} {units.speed}
        </ThemedText>
      </View>
    </View>
  );
};

export default WeatherSingleCard;

const styles = StyleSheet.create({
  weather: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 21
  },
  wind: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  weatherDescription: {
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
