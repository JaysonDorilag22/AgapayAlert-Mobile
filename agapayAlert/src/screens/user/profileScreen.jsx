import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, Image, TextInput, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, editUserInfo } from "@redux/actions/userActions";
import { logout } from "@redux/actions/authActions";
import tw from 'twrnc';
import { pickImage } from "@utils/imageUpload";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, user, token } = useSelector((state) => state.auth);
  const [localUser, setLocalUser] = useState(user);
  const [localToken, setLocalToken] = useState(token);
  const [isEditing, setIsEditing] = useState(false);
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [avatar, setAvatar] = useState(user?.avatar?.url || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setAvatar(user.avatar.url);
    }
  }, [user]);

  const fetchUserInfo = async () => {
    if (user && user._id) {
      dispatch(getUserInfo(user._id));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setLocalUser(null);
    setLocalToken(null);
    navigation.navigate("Welcome");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleChooseAvatar = async () => {
    const result = await pickImage(setAvatar, setIsLoading);
    if (result && !result.canceled) {
      setAvatar(result.uri);
      console.log("Selected avatar:", result.uri);
    }
  };

  const handleSaveProfile = async () => {
    const changes = {};
    if (firstname !== localUser.firstname) changes.firstname = firstname;
    if (lastname !== localUser.lastname) changes.lastname = lastname;
    if (avatar !== localUser.avatar.url) changes.avatar = avatar;
  
    console.log("Changes before update:", changes);
  
    setIsLoading(true);
    const formData = new FormData();
    if (changes.firstname) formData.append("firstname", changes.firstname);
    if (changes.lastname) formData.append("lastname", changes.lastname);
  
    if (changes.avatar && changes.avatar.startsWith("file://")) {
      const fileName = changes.avatar.split('/').pop();
      formData.append("avatar", {
        uri: changes.avatar,
        type: "image/jpeg",
        name: fileName,
      });
    }
  
    try {
      const response = await dispatch(editUserInfo(user._id, formData));
      if (response && response.payload) {
        const updatedUser = response.payload.user; // Access the user object from the payload
        console.log("Updated user:", updatedUser);
        if (updatedUser.avatar && updatedUser.avatar.url) {
          setLocalUser(updatedUser);
          setAvatar(updatedUser.avatar.url); // Update the avatar URL in the state
        } else {
          console.error("Avatar URL is missing in the updated user data:", updatedUser);
          throw new Error("Avatar URL is missing in the updated user data");
        }
        setIsEditing(false);
      } else {
        throw new Error("Failed to get updated user data");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={tw`flex-1 justify-center items-center p-5 bg-gray-100`}>
      <Text style={tw`text-3xl font-bold mb-5 text-blue-600`}>Profile Screen</Text>
      {loading || isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : localUser ? (
        <View style={tw`w-full bg-white rounded-lg p-5 items-center shadow-lg`}>
          <TouchableOpacity onPress={handleChooseAvatar}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={tw`w-24 h-24 rounded-full mb-5 border border-gray-300`} />
            ) : (
              <View style={tw`w-24 h-24 rounded-full mb-5 bg-gray-300 items-center justify-center`}>
                <Text style={tw`text-white`}>No Avatar</Text>
              </View>
            )}
            <Text style={tw`text-blue-500`}>Change Avatar</Text>
          </TouchableOpacity>
          {isEditing ? (
            <>
              <TextInput
                style={tw`text-xl font-bold mb-2 border-b border-gray-300 w-full p-2`}
                value={firstname}
                onChangeText={setFirstname}
                placeholder="First Name"
              />
              <TextInput
                style={tw`text-xl font-bold mb-2 border-b border-gray-300 w-full p-2`}
                value={lastname}
                onChangeText={setLastname}
                placeholder="Last Name"
              />
              <Text style={tw`text-base text-gray-600 mb-2`}>{localUser.email}</Text>
              <TouchableOpacity style={tw`bg-green-500 p-3 rounded-lg w-full mt-3`} onPress={handleSaveProfile}>
                <Text style={tw`text-white font-bold text-center`}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={tw`text-xl font-bold mb-2`}>{localUser.firstname} {localUser.lastname}</Text>
              <Text style={tw`text-base text-gray-600 mb-2`}>{localUser.email}</Text>
              <Text style={tw`text-sm text-gray-500 mb-5`}>Token: {localToken}</Text>
              <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-lg w-full mb-3`} onPress={handleEditProfile}>
                <Text style={tw`text-white font-bold text-center`}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-lg w-full mb-3`} onPress={() => navigation.navigate("MyReports")}>
                <Text style={tw`text-white font-bold text-center`}>My Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-red-500 p-3 rounded-lg w-full`} onPress={handleLogout}>
                <Text style={tw`text-white font-bold text-center`}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
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