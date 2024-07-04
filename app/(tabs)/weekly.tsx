import { StyleSheet, ScrollView, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';

const WeeklyScreen = () => {
  const { deviceGeoPosition } = useGeo();
  const { daily } = useWeather();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Weekly</ThemedText>
      {deviceGeoPosition && (
        <>
          <ThemedText type="subtitle">{deviceGeoPosition?.city}</ThemedText>
          <ThemedText type="defaultSemiBold">
            [{deviceGeoPosition?.region ? `${deviceGeoPosition.region}, ` : ''}
            {deviceGeoPosition?.country}]
          </ThemedText>
          <ThemedText type="default">
            ({deviceGeoPosition?.latitude}, {deviceGeoPosition?.longitude})
          </ThemedText>
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
