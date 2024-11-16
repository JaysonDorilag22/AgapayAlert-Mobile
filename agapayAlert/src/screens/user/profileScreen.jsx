import React, { useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@redux/actions/userActions"; // Adjust the import path as needed
import { logout } from "@redux/actions/authActions";
import tw from 'twrnc';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, user, token } = useSelector((state) => state.auth); // Access loading, user, and token from auth state
  const [localUser, setLocalUser] = useState(user);
  const [localToken, setLocalToken] = useState(token);

  const fetchUserInfo = async () => {
    if (user && user._id) {
      const action = await dispatch(getUserInfo(user._id));
      if (action.type === "GET_USER_INFO_SUCCESS") {
        setLocalUser(action.payload);
        setLocalToken(action.payload.token); // Assuming the token is part of the user payload
      }
    }
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    dispatch(logout());
    setLocalUser(null);
    setLocalToken(null);
    navigation.navigate("Welcome"); // Navigate to the Welcome screen after logout
  };

  console.log("User:", localUser);
  console.log("Token:", localToken);

  return (
    <View style={tw`flex-1 justify-center items-center p-5 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-5`}>Profile Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : localUser ? (
        <View style={tw`w-full bg-white rounded-lg p-5 items-center shadow-lg`}>
          <Image source={{ uri: localUser.avatar.url }} style={tw`w-24 h-24 rounded-full mb-5`} />
          <Text style={tw`text-xl font-bold mb-2`}>{localUser.firstname} {localUser.lastname}</Text>
          <Text style={tw`text-base text-gray-600 mb-2`}>{localUser.email}</Text>
          <Text style={tw`text-sm text-gray-500 mb-5`}>Token: {localToken}</Text>
          <TouchableOpacity style={tw`bg-red-500 p-3 rounded-lg`} onPress={handleLogout}>
            <Text style={tw`text-white font-bold`}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={tw`text-base text-gray-600 mb-5`}>No user information available.</Text>
          <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-lg`} onPress={fetchUserInfo}>
            <Text style={tw`text-white font-bold`}>Fetch User Info</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}