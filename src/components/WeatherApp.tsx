import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useEffect } from 'react';

import { C42_VIOLET } from '@/style/Colors';
import { useNetwork } from '@/contexts/NetworkContext';
import shootAlert from '@/utils/shoot-alert';

const WeatherApp = () => {
  const { isConnected } = useNetwork();

  useEffect(() => {
    if (!isConnected) {
      shootAlert('Network Error!', 'Please check your internet connection.');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={C42_VIOLET}
        barStyle={'dark-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      {/* Main Content */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
});

export default WeatherApp;
