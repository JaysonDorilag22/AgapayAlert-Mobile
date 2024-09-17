// src/screens/auth/SignUpScreen.js
import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "../../styles/styles";
import icon1 from "../../../assets/icon1.png";
import tw from "twrnc";

export default function AddressScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={icon1} style={tw`w-30 h-30 mt-2`} />
      <View>
        <Text style={tw`font-bold text-white text-26px text-center mb-1`}>
          Address
        </Text>
      </View>
      <View style={tw`w-full flex-1  bg-[#F1FBFF] items-center p-5 rounded`}>
        <Text
          style={tw`mt-2 mb-5 font-semibold text-20px text-center text-blue-500`}
        >
          Why do we need your address?
        </Text>
        <Text style={tw` mb-5 font-medium text-13px text-center w-3/3`}>
          We ask for your address to help us provide location-specific services
          and to ensure accurate reporting for incidents in your area. Your
          address will also allow us to notify the proper authorities in your
          city when needed. Rest assured, your information is kept secure and
          will only be used for these purposes.
        </Text>
        <Text style={styles.textform}>Street Address</Text>
        <TextInput style={styles.input} placeholder="Street Address" />
        <Text style={styles.textform}>Barangay</Text>
        <TextInput style={styles.input} placeholder="Barangay" />
        <Text style={styles.textform}>City</Text>
        <TextInput style={styles.input} placeholder="City" />
        <Text style={styles.textform}>Postal Code</Text>
        <TextInput style={styles.input} placeholder="Postal Code" />

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textWhite}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
