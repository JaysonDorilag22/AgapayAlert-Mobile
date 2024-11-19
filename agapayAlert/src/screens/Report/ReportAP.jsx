import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "@components/ProgressBar";
import tw from "twrnc";

export default function ReportAP() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const items = [
    { label: 'Parent', value: 'parent' },
    { label: 'Sibling', value: 'sibling' },
    { label: 'Relative', value: 'relative' },
    { label: 'Spouse', value: 'spouse' },
    { label: 'Child', value: 'child' },
    { label: 'Friend', value: 'friend' },
    { label: 'Colleague', value: 'colleague' },
    { label: 'Neighbor', value: 'neighbor' },
    { label: 'Others', value: 'others' },
  ];

  const filteredItems = items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={tw`flex-1`}>
      <ProgressBar step={1} totalSteps={5} />
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
      <View>
        <View>
          <Text style={tw`font-bold text-26px mb-1 text-center`}>Reportee's Information</Text>
        </View>
      <View style={tw`flex-row px-4`}>
        <Text style={tw`text-sm ml-4 text-center`}>Check if the details below are correct before proceeding.</Text>
      </View>
      <View style={tw`items-center mb-2 pt-4`}>
        <Image source={require('../../../assets/AGAPAYALERT.png')} style={tw`w-20 h-20 rounded-full`} resizeMode="contain" />
      </View>
      <View style={tw`justify-start p-4`}>
        <Text style={tw`text-base font-bold mb-3 mb-1`}>Name</Text>
        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} value="John Doe"readOnly/>
        <Text style={tw`text-base font-bold mt-3 mb-1`}>Address</Text>
        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} value="Taguig kineme" readOnly />
        <Text style={tw`text-base font-bold mt-3 mb-1`}>Contact Number</Text>
        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} value="0909095656879" readOnly />
        <View style={tw`flex-row pt-4 gap-4`}>
        <TouchableOpacity style={[tw`py-3 px-10 rounded-full mt-4`, {backgroundColor: '#b91c1c' }]}  onPress={() => navigation.navigate("Home")}>
            <Text style={tw`text-white text-center`}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4`, {backgroundColor: '#123f7b' }]}  onPress={() => navigation.navigate("ReportAP2")}>
            <Text style={tw`text-white text-center`}>Proceed</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
    </View>
  );
}