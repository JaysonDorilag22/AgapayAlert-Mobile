import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import reportData from "src/constants/dummyData";

const { width } = Dimensions.get("window");

export default function DashboardCards() {
  const totalReports = reportData.length;

  const statusCounts = reportData.reduce((acc, report) => {
    acc[report.status] = (acc[report.status] || 0) + 1;
    return acc;
  }, {});

  const categoryCounts = reportData.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {});

  const dateCounts = reportData.reduce((acc, report) => {
    const date = new Date(report.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Reports</Text>
        <Text style={styles.cardValue}>{totalReports}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reports by Status</Text>
        {Object.entries(statusCounts).map(([status, count]) => (
          <Text key={status} style={styles.cardDetail}>
            {status}: <Text style={styles.cardValue}>{count}</Text>
          </Text>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reports by Category</Text>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <Text key={category} style={styles.cardDetail}>
            {category}: <Text style={styles.cardValue}>{count}</Text>
          </Text>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reports by Date</Text>
        {Object.entries(dateCounts).map(([date, count]) => (
          <Text key={date} style={styles.cardDetail}>
            {date}: <Text style={styles.cardValue}>{count}</Text>
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
    width: width - 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e3e3e3",
    backgroundColor: "#050C9C",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#fff",
  },
  cardDetail: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
  },
});