import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, editUserInfo } from "@redux/actions/userActions";
import { logout } from "@redux/actions/authActions";
import tw from 'twrnc';
import { pickImage } from "@utils/imageUpload";
import styles from "@styles/styles";
import EditProfileForm from "./EditProfileForm";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);
  const [localUser, setLocalUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [avatar, setAvatar] = useState(user?.avatar?.url || '');
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo || '');
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
  });
  const [preferredNotifications, setPreferredNotifications] = useState(user?.preferred_notifications || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setAvatar(user.avatar.url);
      setPhoneNo(user.phoneNo);
      setAddress({
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
        country: user.address.country,
      });
      setPreferredNotifications(user.preferred_notifications);
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
    navigation.navigate("Welcome");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleChooseAvatar = async () => {
    setIsAvatarLoading(true);
    const result = await pickImage(setAvatar, setIsAvatarLoading);
    if (result && !result.canceled) {
      setAvatar(result.uri);
      console.log("Selected avatar:", result.uri);
    }
    setIsAvatarLoading(false);
  };

  const handleSaveProfile = async () => {
    const changes = {};
    if (firstname !== localUser.firstname) changes.firstname = firstname;
    if (lastname !== localUser.lastname) changes.lastname = lastname;
    if (avatar !== localUser.avatar.url) changes.avatar = avatar;
    if (phoneNo !== localUser.phoneNo) changes.phoneNo = phoneNo;
    if (address.street !== localUser.address.street) changes.street = address.street;
    if (address.city !== localUser.address.city) changes.city = address.city;
    if (address.state !== localUser.address.state) changes.state = address.state;
    if (address.zipCode !== localUser.address.zipCode) changes.zipCode = address.zipCode;
    if (address.country !== localUser.address.country) changes.country = address.country;
    if (preferredNotifications !== localUser.preferred_notifications) changes.preferred_notifications = preferredNotifications;

    console.log("Changes before update:", changes);

    setIsLoading(true);
    const formData = new FormData();
    if (changes.firstname) formData.append("firstname", changes.firstname);
    if (changes.lastname) formData.append("lastname", changes.lastname);
    if (changes.phoneNo) formData.append("phoneNo", changes.phoneNo);
    if (changes.street) formData.append("address[street]", changes.street);
    if (changes.city) formData.append("address[city]", changes.city);
    if (changes.state) formData.append("address[state]", changes.state);
    if (changes.zipCode) formData.append("address[zipCode]", changes.zipCode);
    if (changes.country) formData.append("address[country]", changes.country);
    if (changes.preferred_notifications) formData.append("preferred_notifications", JSON.stringify(changes.preferred_notifications));

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
        const updatedUser = response.payload.user; 
        console.log("Updated user:", updatedUser);
        if (updatedUser.avatar && updatedUser.avatar.url) {
          setLocalUser(updatedUser);
          setAvatar(updatedUser.avatar.url); 
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
    }
    setIsLoading(false);
  };

  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      {loading || isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : localUser ? (
        <View style={styles.form2}>
          <TouchableOpacity onPress={handleChooseAvatar}>
            {isAvatarLoading ? (
              <ActivityIndicator size="large" color="#0000ff" style={tw`w-24 h-24 rounded-full mb-5`} />
            ) : avatar ? (
              <Image source={{ uri: avatar }} style={tw`w-24 h-24 rounded-full mb-5 border border-gray-300`} />
            ) : (
              <View style={tw`w-24 h-24 rounded-full mb-5 bg-gray-300 items-center justify-center`}>
                <Text style={tw`text-white`}>No Avatar</Text>
              </View>
            )}
            <Text style={tw`text-blue-500`}>Change Avatar</Text>
          </TouchableOpacity>
          {isEditing ? (
            <EditProfileForm
              firstname={firstname}
              setFirstname={setFirstname}
              lastname={lastname}
              setLastname={setLastname}
              phoneNo={phoneNo}
              setPhoneNo={setPhoneNo}
              address={address}
              setAddress={setAddress}
              preferredNotifications={preferredNotifications}
              setPreferredNotifications={setPreferredNotifications}
              handleSaveProfile={handleSaveProfile}
            />
          ) : (
            <>
              <Text style={tw`text-xl font-bold mb-2`}>{localUser.firstname} {localUser.lastname}</Text>
              <Text style={tw`text-base text-gray-600 mb-2`}>{localUser.email}</Text>
              <TouchableOpacity style={styles.buttonPrimary} onPress={handleEditProfile}>
                <Text style={styles.textWhite}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate("MyReports")}>
                <Text style={styles.textWhite}>My Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
                <Text style={styles.textWhite}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <View>
          <Text style={tw`text-base text-gray-600 mb-5`}>No user information available.</Text>
          <TouchableOpacity style={styles.buttonPrimary} onPress={fetchUserInfo}>
            <Text style={styles.textWhite}>Fetch User Info</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}