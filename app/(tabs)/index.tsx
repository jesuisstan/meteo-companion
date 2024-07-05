import { StyleSheet } from 'react-native';

import ThemedView from '@/components/ui/ThemedView';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';
import WeatherSingleCard from '@/components/WeatherSingleCard';

const CurrentlyScreen = () => {
  const { geoPosition } = useGeo();
  const { current } = useWeather();

  return (
    <ThemedView style={[styles.container]}>
      {geoPosition ? (
        <WeatherHeader geoPosition={geoPosition} />
      ) : (
        <Spinner size={21} />
      )}

      {current ? (
        <WeatherSingleCard
          temperature={current.temperature}
          description={current.description}
          windSpeed={current.windSpeed}
          units={current.units}
        />
      ) : (
        <Spinner size={21} />
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
    gap: 42,
    margin: 21
  }
});
