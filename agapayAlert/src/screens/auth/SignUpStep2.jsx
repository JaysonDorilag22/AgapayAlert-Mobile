import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import styles from "@styles/styles";

export default function SignUpStep2({ nextStep, prevStep, formData, errors, touched, handleChange, handleBlur }) {
  return (
    <View style={tw`flex-1 items-center`}>
      <View style={tw`justify-center items-center mt-4`}>
        <Text style={tw`font-bold text-26px mb-1 text-center`}>Address</Text>
      </View>
      <Text style={styles.textform}>Street</Text>
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={formData.address.street}
        onChangeText={handleChange("address.street")}
        onBlur={handleBlur("address.street")}
      />
      {touched.address?.street && errors.address?.street && <Text style={styles.errorText}>{errors.address.street}</Text>}
      <Text style={styles.textform}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.address.city}
        onChangeText={handleChange("address.city")}
        onBlur={handleBlur("address.city")}
      />
      {touched.address?.city && errors.address?.city && <Text style={styles.errorText}>{errors.address.city}</Text>}
      <Text style={styles.textform}>State</Text>
      <TextInput
        style={styles.input}
        placeholder="State"
        value={formData.address.state}
        onChangeText={handleChange("address.state")}
        onBlur={handleBlur("address.state")}
      />
      {touched.address?.state && errors.address?.state && <Text style={styles.errorText}>{errors.address.state}</Text>}
      <Text style={styles.textform}>Zip Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={formData.address.zipCode}
        onChangeText={handleChange("address.zipCode")}
        onBlur={handleBlur("address.zipCode")}
      />
      {touched.address?.zipCode && errors.address?.zipCode && <Text style={styles.errorText}>{errors.address.zipCode}</Text>}
      <Text style={styles.textform}>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={formData.address.country}
        onChangeText={handleChange("address.country")}
        onBlur={handleBlur("address.country")}
      />
      {touched.address?.country && errors.address?.country && <Text style={styles.errorText}>{errors.address.country}</Text>}
      <View style={tw`flex-row justify-center p-2 px-10`}>
        <TouchableOpacity style={[tw`flex-1 items-center`, styles.buttonPrimary]} onPress={prevStep}>
          <Text style={styles.textWhite}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[tw`flex-1 items-center`, styles.buttonSecondary]} onPress={nextStep}>
          <Text style={styles.textPrimary}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}