import React from 'react';
import styles from "@styles/styles";
import verification from "@assets/verification.png";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import HeaderIcon from "@components/HeaderIcon";
import tw from "twrnc";

export default function VerifiedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderIcon />
      <View style={tw`w-full flex-1 bg-[#F1FBFF] items-center pt-10 rounded justify-center pb-10`}>
        <Image source={verification} style={tw`w-30 h-30 mb-5`} />
        <Text style={tw`font-bold text-blue-500 text-26px mb-1 text-center`}>
          Account Verified!
        </Text>
        <Text style={tw`mt-2 mb-5 font-medium text-13px text-center w-3/4`}>
          Your email address has been successfully verified. You can now log in to your account.
        </Text>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textWhite}>Log In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}