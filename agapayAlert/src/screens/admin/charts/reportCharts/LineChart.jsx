import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '@redux/actions/reportActions'; // Ensure this action is defined

export default function LineChartComponent() {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Extracting dates and counts for the chart
  const dateCounts = reports.reduce((acc, report) => {
    const date = new Date(report.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(dateCounts);
  const counts = Object.values(dateCounts);

  // Ensure all counts are valid numbers
  const validDates = dates.filter((_, index) => !isNaN(counts[index]) && counts[index] > 0);
  const validCounts = counts.filter(count => !isNaN(count) && count > 0);

  // Provide default values if no valid data is available
  const chartLabels = validDates.length > 0 ? validDates : ["No Data"];
  const chartData = validCounts.length > 0 ? validCounts : [0];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Line Chart</Text>
      <Text style={styles.description}>Display the trend of reports over time based on createdAt.</Text>
      <View style={styles.separator} />
      <ScrollView horizontal>
        <LineChart
          data={{
            labels: chartLabels,
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={Math.max(Dimensions.get("window").width, chartLabels.length * 80)} // Increase width based on number of dates
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#0000ff",
            backgroundGradientFrom: "#0000ff",
            backgroundGradientTo: "#87cefa",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              margin: 20,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#87cefa",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          fromZero
          xLabelsOffset={-5}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  description: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});