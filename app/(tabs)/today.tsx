import { StyleSheet, Text, ScrollView } from 'react-native';

import ThemedView from '@/components/ui/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';
import WeatherSingleCard from '@/components/WeatherSingleCard';

const TodayScreen = () => {
  const { geoPosition } = useGeo();
  const { hourly } = useWeather();

  return (
    <ThemedView style={styles.container}>
      {geoPosition ? (
        <WeatherHeader geoPosition={geoPosition} />
      ) : (
        <Spinner size={21} />
      )}
      {hourly ? (
        <>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.hourlyItem}>TABLE</Text>
            <Text style={styles.hourlyItem}>TABLE</Text>
            <Text style={styles.hourlyItem}>TABLE</Text>
            <Text style={styles.hourlyItem}>TABLE</Text>
          </ScrollView>

          <ScrollView
            style={styles.scrollView}
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
    </ThemedView>
  );
};

export default TodayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 21
  },
  scrollView: {
    width: '100%',
    marginTop: 10
  },
  card: {
    transform: [{ scale: 0.5 }],
    marginRight: 10
  },
  hourlyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});
