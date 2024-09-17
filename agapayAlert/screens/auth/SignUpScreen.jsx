// src/screens/auth/SignUpScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SignUpScreen({ navigation }) {
  return (
    <View>
      <Text>Sign Up Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}