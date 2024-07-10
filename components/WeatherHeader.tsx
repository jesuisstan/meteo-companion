import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { C42_ORANGE_DARK } from '@/style/Colors';
import { TGeoPosition } from '@/types/geo-types';

const WeatherHeader = ({ geoPosition }: { geoPosition: TGeoPosition }) => {
  if (!geoPosition) return null;

  return (
    <View style={styles.header}>
      <ThemedText type="title" style={styles.title}>
        {geoPosition?.city}
      </ThemedText>
      <ThemedText type="subtitle" style={{ textAlign: 'center' }}>
        {geoPosition?.region ? `${geoPosition.region}, ` : ''}
        {geoPosition?.country}
      </ThemedText>
      <ThemedText type="default">
        ({geoPosition?.latitude}, {geoPosition?.longitude})
      </ThemedText>
    </View>
  );
};

export default WeatherHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    textAlign: 'center'
  },
  title: { color: C42_ORANGE_DARK, textAlign: 'center' }
});
