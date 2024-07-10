import { createContext, useContext, useState, ReactNode, FC } from 'react';
import * as Location from 'expo-location';

import { TGeoContextType } from '@/types/geo-types';
import shootAlert from '@/utils/shoot-alert';

const GeoContext = createContext<TGeoContextType | undefined>(undefined);

export const GeoProvider: FC<{ children: ReactNode }> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [geoPosition, setGeoPosition] = useState<{
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    country: string;
    isoCountryCode: string;
  } | null>(null);

  const getLocation = async (): Promise<void> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        shootAlert(
          'Permission denied!',
          'Permission to access location was denied. You can still enter a location manually.'
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
      const isoCountryCode = reverseGeocodeResult?.isoCountryCode || 'Unknown iso2';

      const newDeviceGeoPosition = {
        latitude,
        longitude,
        city,
        region,
        country,
        isoCountryCode
      };

      setGeoPosition(newDeviceGeoPosition);
    } catch (error) {
      shootAlert('Error', 'Failed to get location.');
    }
  };

  return (
    <GeoContext.Provider value={{ geoPosition, setGeoPosition, getLocation }}>
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
