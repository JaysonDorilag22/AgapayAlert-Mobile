import React from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import reportData from "src/constants/dummyData";

export default function StackedBarChartComponent() {
  // Extracting categories and status counts for the chart
  const categories = ["Missing", "Abducted", "Wanted", "Hit and Run"];
  const statuses = ["Pending", "Confirmed", "Solved"];
  
  const data = categories.map(category => {
    const categoryReports = reportData.filter(report => report.category === category);
    return statuses.map(status => categoryReports.filter(report => report.status === status).length);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stacked Bar Chart</Text>
      <Text style={styles.description}>Display the distribution of status within each category.</Text>
      <ScrollView horizontal>
        <StackedBarChart
          data={{
            labels: categories,
            legend: statuses,
            data: data,
            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
          }}
          width={Math.max(Dimensions.get("window").width, categories.length * 80)} // Adjust width based on number of categories
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
