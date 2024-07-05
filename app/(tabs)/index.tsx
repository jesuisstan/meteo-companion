import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';

const CurrentlyScreen = () => {
  const { deviceGeoPosition } = useGeo();
  const { current } = useWeather();

  return (
    <ThemedView style={[styles.container]}>
      {deviceGeoPosition && (
        <>
          <ThemedText type="title">{deviceGeoPosition?.city}</ThemedText>
          <ThemedText type="subtitle">
            {deviceGeoPosition?.region ? `${deviceGeoPosition.region}, ` : ''}
            {deviceGeoPosition?.country}
          </ThemedText>
          <ThemedText type="default">
            ({deviceGeoPosition?.latitude}, {deviceGeoPosition?.longitude})
          </ThemedText>

          <ThemedText type="default">
            temperature: {current?.temperature} {current?.units.temperature}
          </ThemedText>
          <ThemedText type="default">
            description: {current?.description}
          </ThemedText>
          <ThemedText type="default">
            wind speed: {current?.windSpeed} {current?.units.speed}
          </ThemedText>
        </>
      )}
    </ThemedView>
  );
};

export default CurrentlyScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 21
  }
});
