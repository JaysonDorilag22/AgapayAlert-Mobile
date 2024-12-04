import React, { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '@redux/actions/reportActions'; // Ensure this action is defined

export default function StatusChart() {
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

  // Extracting status counts for the chart
  const statuses = ["Pending", "Confirmed", "Solved"];
  const statusCounts = statuses.map(status => ({
    name: status,
    count: reports.filter(report => report.status === status).length,
    color: status === "Pending" ? "#ff0000" : status === "Confirmed" ? "#00ff00" : "#0000ff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  // Ensure all counts are valid numbers
  const validStatusCounts = statusCounts.filter(item => !isNaN(item.count) && item.count > 0);

  // Provide default values if no valid data is available
  const chartData = validStatusCounts.length > 0 ? validStatusCounts : [{
    name: "No Data",
    count: 1,
    color: "#d3d3d3",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Status Chart</Text>
      <Text style={styles.description}>Display the distribution of report statuses.</Text>
      <View style={styles.separator} />
      <ScrollView horizontal>
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width}
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
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
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