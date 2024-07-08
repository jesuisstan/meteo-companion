import { StyleSheet, ScrollView } from 'react-native';

import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';
import WeatherSingleCard from '@/components/WeatherSingleCard';
import { ThemedText } from '@/components/ui/ThemedText';
import HourlyChart from '@/components/charts/HourlyChart';

const TodayScreen = () => {
  const { geoPosition } = useGeo();
  const { loading, hourly } = useWeather();
  const [year, month, day] = new Date().toISOString().slice(0, 10).split('-');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      {geoPosition ? (
        <WeatherHeader geoPosition={geoPosition} />
      ) : (
        <Spinner size={21} />
      )}
      {loading ? (
        <Spinner size={21} />
      ) : hourly ? (
        <>
          <ThemedText type="subtitle">
            Hourly Forecast ({day}/{month})
          </ThemedText>
          <HourlyChart hourlyWeatherData={hourly} />
          <ScrollView
            style={styles.scrollViewCards}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            {hourly.map((item, index) => (
              <WeatherSingleCard
                key={index}
                temperature={item.temperature}
                weatherCode={item.weatherCode}
                description={item.description}
                windSpeed={item.windSpeed}
                units={item.units}
                hour={item.hour}
                isDay={item.isDay}
                style={styles.card}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <ThemedText>No hourly weather data available.</ThemedText>
      )}
    </ScrollView>
  );
};

export default TodayScreen;

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
    minHeight: 180,
    width: '90%'
  },
  card: {
    transform: [{ scale: 0.7 }]
  }
});
