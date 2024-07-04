import { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import {
  TabView,
  TabBar,
  Route,
  SceneRendererProps,
  NavigationState
} from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import * as colors42 from '@/style/Colors';

import CurrentlyScreen from './index';
import TodayScreen from './today';
import WeeklyScreen from './weekly';
import SearchBar from '@/components/SearchBar';
import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';

const initialLayout = { width: Dimensions.get('window').width };
const windowHeight = Dimensions.get('window').height;

type RouteProps = Route & { icon: string };
type State = NavigationState<RouteProps>;

const TabLayout = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'currently', title: 'Currently', icon: 'pulse' },
    { key: 'today', title: 'Today', icon: 'today' },
    { key: 'weekly', title: 'Weekly', icon: 'calendar' }
  ];
  const { deviceGeoPosition, getLocation } = useGeo();
  const { fetchWeatherData } = useWeather();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        await getLocation();
        deviceGeoPosition &&
          fetchWeatherData(
            deviceGeoPosition!.latitude,
            deviceGeoPosition!.longitude
          );
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'currently':
        return <CurrentlyScreen />;
      case 'today':
        return <TodayScreen />;
      case 'weekly':
        return <WeeklyScreen />;
      default:
        return null;
    }
  };

  const renderIcon = ({
    route,
    focused
  }: {
    route: RouteProps;
    focused: boolean;
  }) => (
    <Ionicons
      name={focused ? (route.icon as any) : (`${route.icon}-outline` as any)}
      size={21}
      color={focused ? colors42.C42_GREEN_DARK : colors42.C42_TEXT}
    />
  );

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <TabBar
      {...props}
      renderIcon={renderIcon}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
      pressColor="transparent"
    />
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <SearchBar />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={windowHeight ? renderScene : () => null}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: colors42.C42_VIOLET,
    zIndex: 1
  },
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: colors42.C42_VIOLET,
    paddingTop: 5
  },
  indicator: {
    backgroundColor: colors42.C42_GREEN_DARK
  },
  label: {
    fontSize: 10,
    color: colors42.C42_TEXT,
    fontWeight: 'bold'
  }
});

export default TabLayout;
