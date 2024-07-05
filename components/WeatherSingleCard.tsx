import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { ThemedText } from '@/components/ui/ThemedText';
import { C42_ORANGE_DARK, C42_VIOLET_DARK } from '@/style/Colors';

type TWeatherSingleCardProps = {
  temperature: number;
  description: string;
  windSpeed: number;
  units: {
    temperature: string;
    speed: string;
  };
};

const WeatherSingleCard = ({
  temperature,
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
      <ThemedText type="default">{description}</ThemedText>
      <View style={styles.wind}>
        <Feather name="wind" size={24} color="black" />
        <ThemedText type="default">
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
    gap: 10
  },
  wind: {
    flexDirection: 'row',
    gap: 10
  }
});
