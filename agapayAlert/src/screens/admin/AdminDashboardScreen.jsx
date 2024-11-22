import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import CategoryChart from "./charts/reportCharts/CategoryChart";
import LineChart from "./charts/reportCharts/LineChart";
import StackedBarChart from "./charts/reportCharts/StackedBarChart";
import StatusChart from "./charts/reportCharts/StatusChart";
import AdminNavbar from "@components/AdminNavbar";
import DashboardCards from "./charts/dashBoardCards/DashboardCards";
import AdminReportTable from "./adminReport/AdminReportTable";
const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

export default function AdminDashboardScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <AdminNavbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <DashboardCards/>
        <View style={styles.grid}>
          <View style={styles.chartContainer}>
            <CategoryChart />
          </View>
          <View style={styles.chartContainer}>
            <LineChart />
          </View>
          <View style={styles.chartContainer}>
            <StackedBarChart />
          </View>
          <View style={styles.chartContainer}>
            <StatusChart />
          </View>
        <Text style={styles.title}>Reports</Text>
          <AdminReportTable/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 100, 
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chartContainer: {
    width: isLargeScreen ? "50%" : "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1FBFF",
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#8BACB8",
    borderRadius: 5,
  },
});