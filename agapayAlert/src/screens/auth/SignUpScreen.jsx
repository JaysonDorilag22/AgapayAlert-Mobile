import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import styles from "../../styles/styles";
import icon1 from "../../../assets/icon1.png";
import avatar from "../../../assets/avatar.png";

export default function SignUpScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Image Picker Result: ", result); // Debugging log

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setIsLoading(true);
      console.log("Image URI: ", uri); // Debugging log
      // Simulate image upload
      setTimeout(() => {
        setSelectedImage(uri);
        setIsLoading(false);
        console.log("Upload successful, Image URI: ", uri); // Debugging log
      }, 2000); // Simulate a 2-second upload time
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-[#050C9C]`}>
      <View>
      <Image source={icon1} style={tw`w-30 h-30`} />
      </View>
      <View>
        <Text style={tw`font-bold text-white text-26px mb-1 text-center`}>
          Create Account
        </Text>
      </View>
      <View style={tw`w-full flex-1 bg-[#F1FBFF] items-center  rounded`}>
        <TouchableOpacity onPress={pickImage}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Image 
              source={selectedImage ? { uri: selectedImage } : avatar} 
              style={[tw`w-20 h-20 mt-3`, { aspectRatio: 1, borderRadius: 40 }]} 
            />
          )}
        </TouchableOpacity>
        
        <Text style={styles.textform}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
        />
        <Text style={styles.textform}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last name"
        />
        <Text style={styles.textform}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
        />
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
        <Text style={styles.textform}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="+63"
          keyboardType="phone-pad"
          maxLength={13} 
        />
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("verification")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textWhite}>Sign Up</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>
            Already have an account?{" "}
            <Text style={{ color: "blue" }}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}