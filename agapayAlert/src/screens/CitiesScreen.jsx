import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import NavigationBar from '@components/NavigationBar';


const carouselItems = [
  {
    title: "Taguig City",
    description: "located in Metro Manila, occasionally faces missing persons cases. The city leverages strong community involvement and police collaboration to locate missing individuals, although specific recovery statistics are limited.",
    image: require('../../assets/TAGUIG.jpg'),
  },
  {
    title: "Makati City",
    description: "As a highly urbanized business district, Makati City benefits from extensive CCTV infrastructure and a proactive police force, resulting in high recovery rates for missing persons cases.",
    image: require('../../assets/MAKATI.jpg'),
  },
  {
    title: "Municipality of Pateros",
    description: "The smallest municipality in Metro Manila, Pateros has a strong community-based approach to missing persons cases. With fewer reported cases than larger cities, Pateros resolves most incidents quickly, relying on close-knit community support and local vigilance. ",
    image: require('../../assets/PATEROS.jpg'),
  },
  {
    title: "Pasay City",
    description: "has a higher incidence of complex missing person cases, often connected to criminal activities, partly due to its busy transport hubs and urban density. ",
    image: require('../../assets/PASAY.jpg'),
  },
  {
    title: "Paranaque City",
    description: "Parañaque has managed some high-profile missing persons cases, such as the unresolved incidents of missing “sabungeros” (cockfighting enthusiasts). The city faces challenges with complex cases but demonstrates strong recovery rates for typical missing person incidents. ",
    image: require('../../assets/PARANAQUE.jpg'),
  },
];

export default function CitiesScreen() {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1`}>
      <NavigationBar navigation={navigation} />
      <ScrollView>
      {carouselItems.map((item, index) => (
        <View style={tw`flex-row justify-center items-center p-2`} key={index}>
          <View style={tw`bg-white justify-center items-center rounded-lg shadow-md p-4`}>
            <Image source={item.image} style={tw`w-70 h-40 rounded-lg`} resizeMode="cover" />
            <Text style={tw`text-xl font-bold mt-2`}>{item.title}</Text>
            <Text style={tw`text-base mt-1`}>{item.description}</Text>
          </View>
        </View>
      ))}
      </ScrollView>
    </View>
  );
}