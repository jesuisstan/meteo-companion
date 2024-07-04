import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, StatusBar } from 'react-native';

import { C42_VIOLET } from '@/style/Colors';
import { GeoProvider } from '@/contexts/GeoContext';
import { WeatherProvider } from '@/contexts/WeatherContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    DMSans: require('../assets/fonts/DMSans-Regular.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <WeatherProvider>
      <GeoProvider>
        <View style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={C42_VIOLET}
            barStyle={'default'}
            showHideTransition={'slide'}
            hidden={false}
          />
          {/* Main Content */}
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
      </GeoProvider>
    </WeatherProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
});

export default RootLayout;
