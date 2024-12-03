import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import reportData from "src/constants/dummyData";

export default function StatusChart() {
  // Extracting statuses and counts for the chart
  const statuses = ["Pending", "Confirmed", "Solved"];
  const statusCounts = statuses.map(status => 
    reportData.filter(report => report.status === status).length
  );

  const data = statuses.map((status, index) => ({
    name: status,
    count: statusCounts[index],
    color: ['#f39c12', '#27ae60', '#2980b9'][index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Status Chart</Text>
      <Text style={styles.description}>Display the distribution of report statuses (Pending, Confirmed, Solved).</Text>
      <View style={styles.separator} />
      <ScrollView horizontal>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 40} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: "#0000ff",
            backgroundGradientFrom: "#0000ff",
            backgroundGradientTo: "#87cefa",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
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