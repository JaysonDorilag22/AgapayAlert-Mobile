// src/screens/auth/LoginScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../../styles/styles';
import icon1 from "../../../assets/icon1.png";
import google from "../../../assets/google.png";
import tw from "twrnc";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={icon1} style={tw`w-80 h-80`} />

      <View style={styles.form}>
      <Text style={styles.textform}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
      <Text style={styles.textform}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("SignUp")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textWhite}>Log in</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate("SignUp")}
      >
        <View style={styles.buttonContent}>
          <Image source={google} style={tw`w-6 h-6`} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>Don’t have an account? <Text style={{ color: 'blue' }}>Sign up</Text></Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}