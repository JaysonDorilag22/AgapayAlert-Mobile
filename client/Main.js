import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Main = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
    <Text style={tw`text-lg text-black`}>Main hehehehehe</Text>
  </View>
  );
};

export default Main;