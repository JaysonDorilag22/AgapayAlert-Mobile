import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import tw from "twrnc";

export default function AdminNavbar({ navigation }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={tw`bg-gray-100 shadow-md pt-6`}>
      {/* Navbar Header */}
      <View style={tw`flex-row justify-between items-center p-4`}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View style={tw`flex-1`} />
        <View style={tw`flex-row items-center`}>
          <Text style={tw`ml-2 text-gray-700 font-medium pr-4`}>Hi, {user?.firstname}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={user?.avatar?.url ? { uri: user.avatar.url } : require('../../assets/avatar.png')}
              style={tw`w-10 h-10 rounded-full`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}