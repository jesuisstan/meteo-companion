import { StyleSheet, ScrollView, Text } from 'react-native';

import ThemedView from '@/components/ui/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';

const WeeklyScreen = () => {
  const { geoPosition } = useGeo();
  const { daily } = useWeather();

  return (
    <ThemedView style={styles.container}>
      {geoPosition ? (
        <WeatherHeader geoPosition={geoPosition} />
      ) : (
        <Spinner size={21} />
      )}
      {daily && (
        <>
          <ScrollView style={styles.scrollView}>
            {daily &&
              daily.map((item, index) => (
                <Text key={index} style={styles.hourlyItem}>
                  {item.date}: min {item.minTemperature}{' '}
                  {item.units.minTemperature}, max {item.maxTemperature}{' '}
                  {item.units.maxTemperature}, {item.description}.
                </Text>
              ))}
          </ScrollView>
        </>
      )}
    </ThemedView>
  );
};

export default WeeklyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 21
  },
  scrollView: {
    width: '100%',
    marginTop: 10
  },
  hourlyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});
