import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import EmailVerification from './src/screens/auth/EmailVerification';
import AddressScreen from './src/screens/auth/AddressScreen';



const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="verification" component={EmailVerification} />
        <Stack.Screen name="Address" component={AddressScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}