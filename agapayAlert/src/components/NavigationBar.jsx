import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import tw from "twrnc";

export default function NavbarWithSubmenu({ navigation }) {
  const route = useRoute();
  const user = useSelector((state) => state.auth.user);

  const navItems = [
    { name: "Home", route: "Home", icon: "home" },
    { name: "Reports", route: "Report", icon: "file-text" },
    { name: "Cities", route: "Cities", icon: "building" },
    { name: "Alerts", route: "Notification", icon: "bell" },
    { name: "Feedback", route: "FeedbackList", icon: "comments" }, // New feedback list item
  ];

  return (
    <View style={tw`bg-gray-100 shadow-md pt-6`}>
      {/* Navbar Header */}
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Image 
          source={require('../../assets/AGAPAYALERT.png')} 
          style={tw`w-10 h-10`} 
          resizeMode="contain"
        />
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

      {/* Submenu */}
      <View style={tw`flex-row justify-around bg-white py-3`}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
          >
            <Icon 
              name={item.icon} 
              size={24} 
              color={route.name === item.route ? "#123f7b" : "gray"} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}