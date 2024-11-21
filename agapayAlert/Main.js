import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '@screens/WelcomeScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import HomeScreen from '@screens/HomeScreen';
import ReportScreen from '@screens/ReportScreen';
import ReportDetailsScreen from '@screens/ReportDetailsScreen';
import ReportAP from '@screens/Report/ReportAP';
import ReportAP2 from '@screens/Report/ReportAP2';
import ReportAP3 from '@screens/Report/ReportAP3';
import CitiesScreen from '@screens/CitiesScreen';
import NotificationScreen from '@screens/NotificationScreen';
import EmailVerificationScreen from '@screens/auth/EmailVerificationScreen';
import AddressScreen from '@screens/auth/AddressScreen';
import VerifiedScreen from '@screens/auth/VerifiedScreen'
import Toast from "react-native-toast-message";
import ProfileScreen from '@screens/user/profileScreen';
import PrivateRoute from '@components/PrivateRoute';
const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      <Stack.Screen name="verified" component={VerifiedScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="ReportDetailsScreen" component={ReportDetailsScreen} />
        <Stack.Screen name="Cities" component={CitiesScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="verification" component={EmailVerificationScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ReportAP" component={ReportAP} />
        <Stack.Screen name="ReportAP2" component={ReportAP2} />
        <Stack.Screen name="ReportAP3" component={ReportAP3} />
        {/* <Stack.Screen name="AdminScreen" component={(props) => <PrivateRoute {...props} component={AdminScreen} roles={['admin']} />} /> */}
        


        {/* <Stack.Screen name="Sample" component={SampleScreen} /> */}
      </Stack.Navigator>
      {/* <NavigationBar/> */}
      <Toast/>
    </NavigationContainer>
  );
}