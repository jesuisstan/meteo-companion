import { StyleSheet, Text, ScrollView } from 'react-native';

import ThemedView from '@/components/ui/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';

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
      {hourly && (
        <>
          <ScrollView style={styles.scrollView}>
            {hourly &&
              hourly.map((item, index) => (
                <Text key={index} style={styles.hourlyItem}>
                  {item.hour}: {item.temperature} {item?.units.temperature},{' '}
                  {item.description}, wind speed: {item.windSpeed}{' '}
                  {item?.units.speed}
                </Text>
              ))}
          </ScrollView>
        </>
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
  hourlyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});
