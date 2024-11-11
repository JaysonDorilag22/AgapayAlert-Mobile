// ReportScreen.jsx
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '@styles/styles';
import tw from 'twrnc';
import NavigationBar from '@components/NavigationBar'; // Ensure this path is correct

const reports = [
  {
    name: 'John Doe',
    age: 30,
    type: 'Missing',
    description: 'Last seen wearing a blue jacket and jeans.',
    contact: 'Contact: 123-456-7890',
    image: require('../../assets/avatar.png'), // Ensure this path is correct
  },
  {
    name: 'Jane Smith',
    age: 25,
    type: 'Missing',
    description: 'Last seen at the central park.',
    contact: 'Contact: 987-654-3210',
    image: require('../../assets/avatar.png'), // Ensure this path is correct
  },
  // Add more reports as needed
];

export default function ReportScreen() {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-white`}>
      <NavigationBar navigation={navigation} />
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-2xl font-bold text-center text-gray-800 mb-4`}>Report Page</Text>
        {reports.map((report, index) => (
          <View key={index} style={tw`bg-white shadow-md rounded-lg p-4 mb-4`}>
            <Image source={report.image} style={tw`w-full h-40 rounded-lg mb-4`} resizeMode="cover" />
            <Text style={tw`text-xl font-bold text-gray-800 mb-2`}>{report.name}</Text>
            <Text style={tw`text-base text-gray-700 mb-1`}>Age: {report.age}</Text>
            <Text style={tw`text-base text-gray-700 mb-1`}>Type: {report.type}</Text>
            <Text style={tw`text-base text-gray-700 mb-1`}>Description: {report.description}</Text>
            <Text style={tw`text-base text-gray-700`}>{report.contact}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}