import React from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

  GoogleSignin.configure({
    webClientId: process.env.REACT_APP_CLIENT_ID_WEB, 
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true, 
    forceCodeForRefreshToken: true, 
    iosClientId: process.env.REACT_APP_CLIENT_ID_IOS, 
  });

export default function GoogleAuth() {
  return (
    <View>
        <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={isSigninInProgress}
        />
        <StatusBar style="auto" />
    </View>
  )
}
