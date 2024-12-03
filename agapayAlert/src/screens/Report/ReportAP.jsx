import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { getUserInfo } from "@redux/actions/userActions";

export default function ReportAP({ nextStep }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);
  const [localUser, setLocalUser] = useState(user);
  const [avatar, setAvatar] = useState(user?.avatar?.url || '');

  useEffect(() => {
    if (user && user._id) {
      dispatch(getUserInfo(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
      setAvatar(user.avatar?.url || '');
    }
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  return (
    <View style={tw`flex-1`}>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
        <View>
          <View>
            <Text style={tw`font-bold text-26px mb-1 text-center`}>Reportee's Information</Text>
          </View>
          <View style={tw`flex-row px-4`}>
            <Text style={tw`text-sm ml-4 text-center`}>Check if the details below are correct before proceeding.</Text>
          </View>
          <View style={tw`items-center mb-2 pt-4`}>
            <Image source={{ uri: avatar }} style={tw`w-20 h-20 rounded-full`} resizeMode="contain" />
          </View>
          <View style={tw`justify-start p-4`}>
            <Text style={tw`text-base font-bold mb-3 mb-1`}>Name</Text>
            <TextInput
              style={tw`bg-white border p-2 rounded-md shadow-md`}
              value={localUser ? `${localUser.firstname} ${localUser.lastname}` : ''}
              editable={false}
            />
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Address</Text>
            <TextInput
              style={tw`bg-white border p-2 rounded-md shadow-md`}
              value={localUser ? `${localUser.address.street}, ${localUser.address.city}` : ''}
              editable={false}
            />
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Contact Number</Text>
            <TextInput
              style={tw`bg-white border p-2 rounded-md shadow-md`}
              value={localUser ? localUser.phoneNo : ''}
              editable={false}
            />
            <View style={tw`flex-row pt-4 gap-4`}>
              <TouchableOpacity style={[tw`py-3 px-10 rounded-full mt-4 border`, { backgroundColor: 'white', borderColor: '#123f7b' }]} onPress={() => navigation.navigate("Profile")}>
                <Text style={tw`text-black text-center`}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4 border`, { backgroundColor: '#DAF5FF', borderColor: '#050C9C' }]} onPress={nextStep}>
                <Text style={tw`text-[#050C9C] text-center`}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}