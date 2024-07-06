import { StyleSheet, ScrollView, Text } from 'react-native';

import { useGeo } from '@/contexts/GeoContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherHeader from '@/components/WeatherHeader';
import Spinner from '@/components/ui/Spinner';
import { ThemedText } from '@/components/ui/ThemedText';
import HourlyChart from '@/components/charts/HourlyChart';
import WeatherDailyCard from '@/components/WeatherDailyCard';

const WeeklyScreen = () => {
  const { geoPosition } = useGeo();
  const { daily } = useWeather();

  //// Prepare data for the chart
  //const chartData = {
  //  labels: daily ? daily.map((item) => item.hour.split(':')[0]) : [],
  //  datasets: [
  //    {
  //      data: daily ? daily.map((item) => item.temperature) : []
  //    }
  //  ]
  //};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      {geoPosition ? (
        <WeatherHeader geoPosition={geoPosition} />
      ) : (
        <Spinner size={21} />
      )}
      {daily ? (
        <>
          <ThemedText type="subtitle">Daily Forecast</ThemedText>
          {/*<HourlyChart
            chartData={chartData}
            yAxisSuffix={` ${daily[0]?.units.temperature}`}
          />*/}
          <ScrollView
            style={styles.scrollViewCards}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
          >
            {daily.map((item, index) => (
              <WeatherDailyCard
                key={index}
                date={item.date}
                maxTemperature={item.maxTemperature}
                minTemperature={item.minTemperature}
                weatherCode={item.weatherCode}
                description={item.description}
                units={item.units}
                style={styles.card}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <Spinner size={21} />
      )}
    </ScrollView>
  );
};

export default WeeklyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerContent: {
    margin: 18,
    gap: 18,
    alignItems: 'center'
  },
  scrollViewCards: {
    width: '100%',
    maxHeight: 'auto',
    minHeight: 180
  },
  card: {
    transform: [{ scale: 0.6 }]
  }
});
