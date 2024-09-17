import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";
import icon1 from "../assets/icon1.png";
import google from "../assets/google.png";
import tw from "twrnc";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={icon1} style={tw`w-70 h-70`} />
      <Text style={tw`font-bold text-white text-26px w-3/4 text-center`}>
        Stay Safe Together Sign In or Register Now!
      </Text>
      <Text
        style={tw`mt-2 mb-5 font-medium text-white text-13px text-center w-3/4`}
      >
        Receive alerts and report incidents to help keep your community safe.
      </Text>
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate("Login")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.textPrimary}>Log In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate("SignUp")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.textWhite}>Sign Up</Text>
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
    </View>
  );
}