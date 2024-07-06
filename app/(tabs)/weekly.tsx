import { StyleSheet, ScrollView, Text } from 'react-native';

import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';

const WeeklyScreen = () => {
  const { geoPosition } = useGeo();
  const { daily } = useWeather();

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
