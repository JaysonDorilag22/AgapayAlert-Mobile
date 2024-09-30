import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { pickImage, requestMediaLibraryPermissions } from "@utils/imageUpload";
import avatar from "@assets/avatar.png";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import styles from "@styles/styles";

export default function SignUpStep3({
  prevStep,
  formData,
  setFormData,
  handleSignUp,
  errors,
  touched,
  handleChange,
  handleBlur,
  validateForm,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const hasPermission = await requestMediaLibraryPermissions();
        if (!hasPermission) {
          Toast.show({
            type: "error",
            text1: "Sorry, we need camera roll permissions to make this work!",
          });
        }
      } catch (error) {
        console.error("Permission error: ", error);
      }
    };

    checkPermissions();
  }, []);

  const handleSignUpWithValidation = async () => {
    // Validate form
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(', ');
      Toast.show({
        type: 'error',
        text1: errorMessages,
      });
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    }

    setLoading(true);
    try {
      await handleSignUp();
    } catch (error) {
      console.error("Sign up error: ", error);
      // Display backend validation errors
      Toast.show({
        type: 'error',
        text1: 'Sign up failed',
        text2: error.message,
      });
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <View style={tw`flex-1 items-center`}>
      <Text style={tw`font-bold text-26px mb-1 text-center`}>Email verification</Text>
      <TouchableOpacity
        onPress={() =>
          pickImage(
            (uri) => {
              console.log("Selected Image URI: ", uri); // Debugging log
              setFormData("avatar", uri); // Update the avatar field correctly
              setSelectedImage(uri);
            },
            setIsLoading
          )
        }
      >
        <View style={tw`w-15 h-15 mt-3`}>
          <Image
            source={selectedImage ? { uri: selectedImage } : avatar} 
            style={[tw`w-full h-full`, { aspectRatio: 1, borderRadius: 40 }]}
          />
          {isLoading && (
            <View
              style={[
                tw`absolute top-0 left-0 w-full h-full justify-center items-center`,
                {
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: 40,
                },
              ]}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.textform}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        keyboardType="email-address"
      />
      {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <Text style={styles.textform}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        secureTextEntry={true}
      />
      {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <Text style={styles.textform}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        secureTextEntry={true}
      />
      {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      <View style={tw`flex-row justify-center p-2 px-10`}>
        <TouchableOpacity
          style={[tw`flex-1 items-center`, styles.buttonPrimary]}
          onPress={prevStep}
        >
          <Text style={styles.textWhite}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex-1 items-center`,
            styles.buttonSecondary,
            loading && { opacity: 0.5 },
          ]}
          onPress={handleSignUpWithValidation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#324" />
          ) : (
            <Text style={styles.textPrimary}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}