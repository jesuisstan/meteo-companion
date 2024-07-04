import { createContext, useContext, useState, ReactNode, FC } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

import { TGeoContextType } from '@/types/geo-types';

const GeoContext = createContext<TGeoContextType | undefined>(undefined);

export const GeoProvider: FC<{ children: ReactNode }> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [deviceGeoPosition, setDeviceGeoPosition] = useState<{
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    country: string;
  } | null>(null);

  const getLocation = async (): Promise<void> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission to access location was denied',
          'You can still enter a location manually.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const [reverseGeocodeResult] = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      const city = reverseGeocodeResult?.city || 'Unknown city';
      const region = reverseGeocodeResult?.region || 'Unknown region';
      const country = reverseGeocodeResult?.country || 'Unknown country';
      //const iso2 = reverseGeocodeResult?.isoCountryCode || 'Unknown iso2';

      const newDeviceGeoPosition = {
        latitude,
        longitude,
        city,
        region,
        country
      };

      setDeviceGeoPosition(newDeviceGeoPosition);
      console.log('Location received:', `${city} (${latitude}, ${longitude})`);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location.');
      console.error('Error fetching location:', error);
    }
  };

  return (
    <GeoContext.Provider
      value={{ deviceGeoPosition, setDeviceGeoPosition, getLocation }}
    >
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => {
  const context = useContext(GeoContext);
  if (context === undefined) {
    throw new Error('useGeo must be used within a GeoProvider');
  }
  return context;
};
