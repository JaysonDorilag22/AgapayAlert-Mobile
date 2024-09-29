import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import styles from "@styles/styles";
import ReactNativePhoneInput from "react-native-phone-input";

export default function SignUpStep1({ nextStep, formData, setFormData, errors, touched, handleChange, handleBlur }) {
  return (
    <View style={tw`flex-1 items-center`}>
      <Text style={tw`font-bold text-26px mb-5 text-center`}>Personal Information</Text>
      <Text style={styles.textform}>First name</Text>
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={formData.firstname}
        onChangeText={handleChange("firstname")}
        onBlur={handleBlur("firstname")}
      />
      {touched.firstname && errors.firstname && <Text style={styles.errorText}>{errors.firstname}</Text>}
      <Text style={styles.textform}>Last name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={formData.lastname}
        onChangeText={handleChange("lastname")}
        onBlur={handleBlur("lastname")}
      />
      {touched.lastname && errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
      <Text style={styles.textform}>Phone no.</Text>
      <ReactNativePhoneInput
        style={styles.input}
        placeholder="Phone no."
        initialCountry="ph"
        value={formData.phoneNo}
        onChangePhoneNumber={(value) => {
          handleChange("phoneNo")(value);
          setFormData({ ...formData, phoneNo: value });
        }}
        onBlur={() => handleBlur("phoneNo")()}
        keyboardType="phone-pad"
      />
      {touched.phoneNo && errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo}</Text>}
      <Text style={styles.textform}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={formData.age}
        onChangeText={handleChange("age")}
        onBlur={handleBlur("age")}
        keyboardType="numeric"
      />
      {touched.age && errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
      <TouchableOpacity style={styles.buttonPrimary} onPress={nextStep}>
        <Text style={styles.textWhite}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}