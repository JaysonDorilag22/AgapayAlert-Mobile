import React, { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '@redux/actions/reportActions'; // Ensure this action is defined

export default function StackedBarChartComponent() {
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

  // Extracting categories and status counts for the chart
  const categories = ["Missing", "Abducted", "Wanted", "Hit and Run"];
  const statuses = ["Pending", "Confirmed", "Solved"];
  
  const data = categories.map(category => {
    const categoryReports = reports.filter(report => report.category === category);
    return statuses.map(status => categoryReports.filter(report => report.status === status).length);
  });

  // Ensure all counts are valid numbers
  const validData = data.map(categoryData => categoryData.map(count => !isNaN(count) && count > 0 ? count : 0));

  // Provide default values if no valid data is available
  const chartLabels = categories.length > 0 ? categories : ["No Data"];
  const chartData = validData.length > 0 ? validData : [[0]];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stacked Bar Chart</Text>
      <Text style={styles.description}>Display the distribution of status within each category.</Text>
      <ScrollView horizontal>
        <StackedBarChart
          data={{
            labels: chartLabels,
            legend: statuses,
            data: chartData,
            barColors: ["#ff0000", "#00ff00", "#0000ff"],
          }}
          width={Math.max(Dimensions.get("window").width, chartLabels.length * 80)} // Adjust width based on number of categories
          height={220}
          chartConfig={{
            backgroundColor: "#0000ff",
            backgroundGradientFrom: "#0000ff",
            backgroundGradientTo: "#87cefa",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
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
  description: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});