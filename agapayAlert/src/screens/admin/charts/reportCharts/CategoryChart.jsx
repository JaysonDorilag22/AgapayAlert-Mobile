import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import reportData from "src/constants/dummyData";

export default function CategoryChart() {
  // Extracting categories and counts for the chart
  const categories = ["Missing", "Abducted", "Wanted", "Hit and Run"];
  const categoryCounts = categories.map(category => 
    reportData.filter(report => report.category === category).length
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Category Chart</Text>
      <Text style={styles.description}>Display the number of reports by category (Missing, Abducted, Wanted, Hit and Run).</Text>
      <View style={styles.separator} />
      <ScrollView horizontal>
        <BarChart
          data={{
            labels: categories,
            datasets: [
              {
                data: categoryCounts,
              },
            ],
          }}
          width={Math.max(Dimensions.get("window").width, categories.length * 80)} // Adjust width based on number of categories
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
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#87cefa",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          fromZero
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