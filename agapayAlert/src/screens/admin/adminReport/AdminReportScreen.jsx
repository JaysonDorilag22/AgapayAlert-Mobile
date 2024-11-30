import React from 'react'
import { View, Text } from 'react-native'
import AdminReportTable from './AdminReportTable'
import tw from 'twrnc'

export default function AdminReportScreen() {
  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Reports</Text>
      <AdminReportTable />
    </View>
  )
}