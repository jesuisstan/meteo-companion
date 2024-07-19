import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

import { GeoProvider } from '@/contexts/GeoContext';
import { WeatherProvider } from '@/contexts/WeatherContext';
import { NetworkProvider } from '@/contexts/NetworkContext';
import WeatherApp from '@/components/WeatherApp';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    DMSans: require('../../assets/fonts/DMSans-Regular.ttf')
  });

  useEffect(() => {
    // Set the initial screen orientation to allow all orientations
    ScreenOrientation.unlockAsync();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NetworkProvider>
      <WeatherProvider>
        <GeoProvider>
          <WeatherApp />
        </GeoProvider>
      </WeatherProvider>
    </NetworkProvider>
  );
};

export default RootLayout;
