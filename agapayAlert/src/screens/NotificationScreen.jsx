// NotificationScreen.jsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import NavigationBar from '@components/NavigationBar'; // Ensure this path is correct
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const cardData = [
  {
    title: "Makati Teen",
    description: "A 15-year-old girl went missing on her way to school in Makati. Last seen in her uniform with a blue backpack. Her family seeks public assistance.",
    iconColor: 'red',
  },
  {
    title: "Taguig Elderly Man",
    description: "An 82-year-old man with dementia disappeared during a morning walk in Taguig. He was last seen wearing a green shirt and gray pants.",
    iconColor: 'yellow',
  },
  {
    title: "Parañaque Sabungero",
    description: "A cockfighting enthusiast vanished after a tournament in Parañaque. Authorities are investigating and urge public help.",
    iconColor: 'green',
  },
  {
    title: "Pasay Boy",
    description: "A 7-year-old boy went missing in a busy Pasay market, last seen wearing a red cap. His parents ask for immediate assistance.",
    iconColor: 'red',
  },
  {
    title: "Pateros Woman",
    description: "A 29-year-old woman disappeared after leaving work in Pateros, last seen near a bus terminal. Family requests any leads.",
    iconColor: 'yellow',
  },
];

export default function NotificationScreen() {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1`}>
      <NavigationBar navigation={navigation} />
      <ScrollView contentContainerStyle={tw`p-4`}>
        {cardData.map((card, index) => (
          <View key={index} style={tw`flex-row bg-white rounded-lg shadow-md p-4 mb-4`}>
            <View style={tw`justify-center items-center mr-4`}>
              <FontAwesome name="exclamation-circle" size={40} color={card.iconColor} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-xl font-bold mb-1`}>{card.title}</Text>
              <Text style={tw`text-base`}>{card.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}