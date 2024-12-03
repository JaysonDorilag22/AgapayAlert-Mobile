import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import reportData from "src/constants/dummyData";

export default function LineChartComponent() {
  // Extracting dates and counts for the chart
  const dates = reportData.map(report => new Date(report.createdAt).toLocaleDateString());
  const counts = reportData.map((_, index) => index + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Line Chart</Text>
      <Text style={styles.description}>Display the trend of reports over time based on createdAt.</Text>
      <View style={styles.separator} />
      <ScrollView horizontal>
        <LineChart
          data={{
            labels: dates,
            datasets: [
              {
                data: counts,
              },
            ],
          }}
          width={Math.max(Dimensions.get("window").width, dates.length * 80)} // Increase width based on number of dates
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#0000ff",
            backgroundGradientFrom: "#0000ff",
            backgroundGradientTo: "#87cefa",
            decimalPlaces: 2, // optional, defaults to 2dp
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