import { StyleSheet, ScrollView } from 'react-native';

import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';
import { ThemedText } from '@/components/ui/ThemedText';
import DailyChart from '@/components/charts/DailyChart';
import WeatherDailyCard from '@/components/WeatherDailyCard';

const WeeklyScreen = () => {
  const { geoPosition } = useGeo();
  const { loading, daily } = useWeather();

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
      ) : daily ? (
        <>
          <ThemedText type="subtitle">Daily Forecast</ThemedText>
          <DailyChart dailyWeatherData={daily} />
          <ScrollView
            style={styles.scrollViewCards}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            {daily.map((item, index) => (
              <WeatherDailyCard
                key={index}
                date={item.date}
                maxTemperature={item.maxTemperature}
                minTemperature={item.minTemperature}
                weatherCode={item.weatherCode}
                description={item.description}
                units={item.units}
                style={styles.card}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <ThemedText>No daily weather data available.</ThemedText>
      )}
    </ScrollView>
  );
};

export default WeeklyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerContent: {
    margin: 18,
    gap: 18,
    alignItems: 'center'
  },
  scrollViewCards: {
    maxHeight: 'auto',
    minHeight: 180
  },
  card: {
    transform: [{ scale: 0.6 }]
  }
});
