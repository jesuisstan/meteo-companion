import { useEffect, useState } from 'react';
import {
  View,
  useWindowDimensions,
  ImageBackground,
  StyleSheet
} from 'react-native';
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
import shootAlert from '@/utils/shoot-alert';
import RefetchButton from '@/components/ui/RefetchButton';

type RouteProps = Route & { icon: string };
type State = NavigationState<RouteProps>;

const TabLayout = () => {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'currently', title: 'Currently', icon: 'pulse' },
    { key: 'today', title: 'Today', icon: 'today' },
    { key: 'weekly', title: 'Weekly', icon: 'calendar' }
  ];
  const { geoPosition, getLocation } = useGeo();
  const { fetchWeatherData } = useWeather();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        await getLocation();
        geoPosition &&
          fetchWeatherData(geoPosition!.latitude, geoPosition!.longitude);
      } catch (error) {
        shootAlert('Error', 'Failed to get location.');
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
      <ImageBackground
        source={require('../../../assets/images/background.jpg')}
        style={styles.imageBackground}
      >
        <View style={[styles.header]}>
          <SearchBar />
        </View>
        <RefetchButton />
        <TabView
          navigationState={{ index, routes }}
          renderScene={height ? renderScene : () => null}
          onIndexChange={setIndex}
          initialLayout={{ width }}
          renderTabBar={renderTabBar}
          tabBarPosition="bottom"
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: colors42.C42_VIOLET,
    zIndex: 1000
  },
  container: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute'
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
