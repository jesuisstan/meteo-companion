import { useState, FC } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import {
  C42_BACKGROUND,
  C42_GREEN,
  C42_GREEN_DARK,
  C42_ORANGE_DARK,
  C42_TEXT,
  C42_VIOLET,
  C42_VIOLET_DARK
} from '@/style/Colors';

const MIN_CHART_HEIGHT = 242;

type TDailyWeather = {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weatherCode: number;
  description: string;
  units: {
    minTemperature: string;
    maxTemperature: string;
  };
};

type TChartDailyData = {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
  }[];
};

type TDataPoint = {
  index: number;
  value: number;
  x: number;
  y: number;
};

type TDailyChartProps = {
  dailyWeatherData: TDailyWeather[];
};

const DailyChart: FC<TDailyChartProps> = ({ dailyWeatherData }) => {
  // Transform dailyWeatherData to chartData
  const chartData: TChartDailyData = {
    labels: dailyWeatherData.map((item) => {
      const [year, month, day] = item.date.split('-');
      return `${day}/${month}`;
    }),
    datasets: [
      {
        data: dailyWeatherData.map((item) => item.maxTemperature),
        color: () => C42_ORANGE_DARK
      },
      {
        data: dailyWeatherData.map((item) => item.minTemperature),
        color: () => C42_VIOLET_DARK
      }
    ]
  };

  const yAxisSuffix = ` ${dailyWeatherData[0]?.units.minTemperature}`; // Assuming the units are the same for min and max temperature

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: 0
  });

  const handleDataPointClick = (data: TDataPoint) => {
    setTooltip({
      visible: true,
      x: data.x,
      y: data.y,
      value: data.value
    });
  };

  return (
    <ScrollView
      style={styles.scrollViewChart}
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      persistentScrollbar={true}
    >
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={chartData.labels.length * 48} // based on number of items
          height={MIN_CHART_HEIGHT}
          yAxisSuffix={yAxisSuffix}
          chartConfig={{
            backgroundColor: C42_BACKGROUND,
            backgroundGradientFrom: C42_BACKGROUND,
            backgroundGradientTo: C42_VIOLET,
            backgroundGradientFromOpacity: 0.8,
            decimalPlaces: 1,
            color: () => C42_GREEN,
            labelColor: () => C42_TEXT,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: C42_GREEN_DARK
            }
          }}
          bezier
          style={styles.chart}
          onDataPointClick={handleDataPointClick}
        />
        {tooltip.visible && (
          <View
            style={[
              styles.tooltip,
              { top: tooltip.y - 15, left: tooltip.x - 15 }
            ]}
          >
            <Text style={styles.tooltipText}>{tooltip.value.toFixed(1)}°</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewChart: {
    minHeight: MIN_CHART_HEIGHT + 10,
    maxHeight: MIN_CHART_HEIGHT * 2,
    height: 'auto'
  },
  chart: {
    borderRadius: 15
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: C42_TEXT,
    padding: 5,
    borderRadius: 15
  },
  tooltipText: {
    color: C42_VIOLET,
    fontSize: 12
  },
  chartContainer: {
    backgroundColor: C42_VIOLET,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 15,
    opacity: 0.8
  }
});

export default DailyChart;
