import React from 'react';
import { View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import tw from 'twrnc';
import logo1 from '@assets/logo1.png'
const ProgressBar = ({ step, totalSteps }) => {
  const progress = step / totalSteps;

  return (
    <View style={tw`items-center my-5`}>
       <Image source={logo1} style={tw`w-30 h-30`} />
      <Text style={tw`mb-2 text-lg`}>Step {step} of {totalSteps}</Text>
      <View style={tw`w-50`}>
        <Progress.Bar progress={progress} width={200} />
      </View>
    </View>
  );
};

export default ProgressBar;