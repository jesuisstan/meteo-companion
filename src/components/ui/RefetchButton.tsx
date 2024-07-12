import 'react-native-reanimated';
import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { C42_TEXT, C42_VIOLET } from '@/style/Colors';
import { useWeather } from '@/contexts/WeatherContext';
import { useGeo } from '@/contexts/GeoContext';

const RefetchButton = () => {
  const { geoPosition } = useGeo();
  const { fetchWeatherData } = useWeather();

  const handlePress = () => {
    if (geoPosition) {
      fetchWeatherData(geoPosition!.latitude, geoPosition!.longitude);
    }
  };
  return (
    <Pressable style={styles.floatingButton} onPress={handlePress}>
      <Feather name="refresh-ccw" size={21} color={C42_TEXT} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    top: '25%',
    right: '5%',
    width: 30,
    height: 30,
    borderRadius: 28, // Make it circular
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C42_VIOLET, // Default background color
    elevation: 4, // for Android shadow
    shadowColor: C42_TEXT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 100, // Ensure it's above other components
    opacity: 0.7
  }
});

export default RefetchButton;
