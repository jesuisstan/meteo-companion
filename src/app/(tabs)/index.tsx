import { StyleSheet, ScrollView, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ThemedView from '@/components/ui/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';
import WeatherSingleCard from '@/components/WeatherSingleCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { C42_ORANGE_DARK } from '@/style/Colors';

const CurrentlyScreen = () => {
  const { geoPosition } = useGeo();
  const { loading, current } = useWeather();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      {geoPosition ? (
        <WeatherHeader geoPosition={geoPosition} />
      ) : (
        <Spinner size={42} />
      )}

      {loading ? (
        <Spinner size={42} />
      ) : current ? (
        <>
          <ThemedText type="subtitle">Current Weather</ThemedText>
          <WeatherSingleCard
            temperature={current.temperature}
            weatherCode={current.weatherCode}
            description={current.description}
            windSpeed={current.windSpeed}
            units={current.units}
            isDay={current.isDay}
          />

          <View style={styles.warning}>
            <Ionicons
              name="warning-outline"
              size={24}
              color={C42_ORANGE_DARK}
            />
            <ThemedText type="default">
              {' '}
              by local time{' '}
              <ThemedText type="defaultSemiBold">
                {current.localTime.time}, {current.localTime.date}
              </ThemedText>
            </ThemedText>
          </View>
        </>
      ) : (
        <ThemedText>No current weather data available.</ThemedText>
      )}
    </ScrollView>
  );
};

export default CurrentlyScreen;

const styles = StyleSheet.create({
  //container: {
  //  flexDirection: 'column',
  //  alignItems: 'center',
  //  margin: 18,
  //  gap: 18
  //},
  container: {
    flex: 1
  },
  containerContent: {
    margin: 18,
    gap: 18,
    alignItems: 'center'
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
