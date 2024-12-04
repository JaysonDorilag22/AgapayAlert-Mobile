import React from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Image } from 'react-native';

const ReportFormScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Reporter */}
      <Text className="text-lg font-semibold mb-2">Reporter ID</Text>
      <TextInput
        placeholder="Enter Reporter ID"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      {/* Missing Person Details */}
      <Text className="text-xl font-bold mb-4">Missing Person Details</Text>

      <Text className="text-lg font-semibold mb-2">Relationship</Text>
      <TextInput
        placeholder="Enter relationship"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">First Name</Text>
      <TextInput
        placeholder="Enter first name"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Last Name</Text>
      <TextInput
        placeholder="Enter last name"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Date of Birth</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Age</Text>
      <TextInput
        placeholder="Enter age"
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Assigned Sex at Birth</Text>
      <TextInput
        placeholder="Male/Female"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Last Known Clothing</Text>
      <TextInput
        placeholder="e.g., Red shirt"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Last Known Location</Text>
      <TextInput
        placeholder="Enter location"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Last Seen Date</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Current Hair Color</Text>
      <TextInput
        placeholder="Enter current hair color"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Alias</Text>
      <TextInput
        placeholder="Enter alias"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Height</Text>
      <TextInput
        placeholder="e.g., 6ft"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Weight</Text>
      <TextInput
        placeholder="e.g., 54kg"
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Race/Nationality</Text>
      <TextInput
        placeholder="e.g., Chinoy"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Eye Color</Text>
      <TextInput
        placeholder="Enter eye color"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Reward Amount</Text>
      <TextInput
        placeholder="Enter reward amount"
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      <Text className="text-lg font-semibold mb-2">Contact Number</Text>
      <TextInput
        placeholder="Enter contact number"
        keyboardType="phone-pad"
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
      />

      {/* Images */}
      <Text className="text-lg font-semibold mb-2">Upload Images</Text>
      <View className="flex-row space-x-4 mb-4">
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          className="w-20 h-20 bg-gray-200 rounded-lg"
        />
        <TouchableOpacity className="bg-blue-500 p-3 rounded-lg">
          <Text className="text-white">Upload Image</Text>
        </TouchableOpacity>
      </View>

      {/* Video */}
      <Text className="text-lg font-semibold mb-2">Upload Video</Text>
      <TouchableOpacity className="bg-blue-500 p-3 rounded-lg mb-4">
        <Text className="text-white">Upload Video</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity className="bg-green-500 p-4 rounded-lg">
        <Text className="text-white text-center font-bold">Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportFormScreen;
