import React from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
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
    <View>
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Phone Number"
        value={phoneNo}
        onChangeText={setPhoneNo}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Street"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="State"
        value={address.state}
        onChangeText={(text) => setAddress({ ...address, state: text })}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Zip Code"
        value={address.zipCode}
        onChangeText={(text) => setAddress({ ...address, zipCode: text })}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Country"
        value={address.country}
        onChangeText={(text) => setAddress({ ...address, country: text })}
      />
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
      <Button title="Save Profile" onPress={handleSaveProfile} />
    </View>
  );
};

export default EditProfileForm;