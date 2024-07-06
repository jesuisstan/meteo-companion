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
  const { hourly } = useWeather();

  // Prepare data for the chart
  const chartData = {
    labels: hourly ? hourly.map((item) => item.hour.split(':')[0]) : [],
    datasets: [
      {
        data: hourly ? hourly.map((item) => item.temperature) : []
      }
    ]
  };

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
      {hourly ? (
        <>
          <ThemedText type="subtitle">Hourly Forecast</ThemedText>
          <HourlyChart
            chartData={chartData}
            yAxisSuffix={` ${hourly[0]?.units.temperature}`}
          />
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
                style={styles.card}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <Spinner size={21} />
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
    width: '100%',
    maxHeight: 'auto',
    minHeight: 180
  },
  card: {
    transform: [{ scale: 0.6 }]
  }
});
