import styles from "@styles/styles";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@redux/actions/userActions"; // Adjust the import path as needed
import { logout } from "@redux/actions/authActions";

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
    <View style={styles.form}>
      <Text>Profile Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : localUser ? (
        <View>
          <Text>Name: {localUser.firstname} {localUser.lastname}</Text>
          <Text>Email: {localUser.email}</Text>
          <Text>Token: {localToken}</Text>
          {/* Add more user details as needed */}
          <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
            <View style={styles.buttonContent}>
              <Text style={styles.textWhite}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>No user information available.</Text>
          <TouchableOpacity style={styles.buttonPrimary} onPress={fetchUserInfo}>
            <View style={styles.buttonContent}>
              <Text style={styles.textWhite}>Fetch User Info</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}