import { StyleSheet, Text, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';

const TodayScreen = () => {
  const { deviceGeoPosition } = useGeo();
  const { hourly } = useWeather();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Today</ThemedText>
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
