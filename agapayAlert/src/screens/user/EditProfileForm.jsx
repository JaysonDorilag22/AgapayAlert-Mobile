import React from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';

const EditProfileForm = ({
  firstname,
  setFirstname,
  lastname,
  setLastname,
  phoneNo,
  setPhoneNo,
  address,
  setAddress,
  preferredNotifications,
  setPreferredNotifications,
  handleSaveProfile
}) => {
  const handleNotificationChange = (notification) => {
    if (preferredNotifications.includes(notification)) {
      setPreferredNotifications(preferredNotifications.filter(n => n !== notification));
    } else if (preferredNotifications.length < 2) {
      setPreferredNotifications([...preferredNotifications, notification]);
    } else {
      Alert.alert("Error", "You can select a maximum of two preferred notifications.");
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`p-2 pb-40`}>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>First Name</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstname}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>Last Name</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>Phone Number</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="Phone Number"
          value={phoneNo}
          onChangeText={setPhoneNo}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>Street</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="Street"
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>City</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="City"
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>State</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="State"
          value={address.state}
          onChangeText={(text) => setAddress({ ...address, state: text })}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>Zip Code</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="Zip Code"
          value={address.zipCode}
          onChangeText={(text) => setAddress({ ...address, zipCode: text })}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>Country</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          placeholder="Country"
          value={address.country}
          onChangeText={(text) => setAddress({ ...address, country: text })}
        />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`mb-1`}>Preferred Notifications:</Text>
        {['sms', 'push', 'email'].map(notification => (
          <TouchableOpacity
            key={notification}
            onPress={() => handleNotificationChange(notification)}
            style={tw`flex-row items-center mb-1`}
          >
            <View style={tw`w-4 h-4 mr-2 ${preferredNotifications.includes(notification) ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <Text>{notification}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={tw`bg-[#007BFF] p-3 rounded-lg items-center mt-4`}
        onPress={handleSaveProfile}
      >
        <Text style={tw`text-white text-lg`}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileForm;