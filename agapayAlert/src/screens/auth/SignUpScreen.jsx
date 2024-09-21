import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@redux/actions/authActions";
import { pickImage, requestMediaLibraryPermissions } from "@utils/imageUpload";
import Toast from "@components/Toast";
import tw from 'twrnc';
import styles from "@styles/styles";
import avatar from "@assets/avatar.png";
import HeaderIcon from "@components/HeaderIcon";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const hasPermission = await requestMediaLibraryPermissions();
        if (!hasPermission) {
          setToastMessage('Sorry, we need camera roll permissions to make this work!');
          setToastType('error');
        }
      } catch (error) {
        console.error("Permission error: ", error);
      }
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    if (message) {
      setToastMessage(message);
      setToastType('success');
      navigation.navigate('verification', { email });
    }
    if (error) {
      setToastMessage(error);
      setToastType('error');
    }
  }, [message, error, navigation, email]);

  const handleSignUp = () => {
    const userData = { firstname, lastname, age, email, password, phone, avatar: selectedImage };
    dispatch(signup(userData));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Toast message={toastMessage} type={toastType} />
      <ScrollView contentContainerStyle={tw`flex-1 justify-center items-center bg-[#050C9C]`}>
        <View>
          <HeaderIcon/>
        </View>
        <View>
          <Text style={tw`font-bold text-white text-26px mb-1 text-center`}>
            Create Account
          </Text>
        </View>
        <View style={tw`w-full flex-1 bg-[#F1FBFF] items-center rounded`}>
          <TouchableOpacity onPress={() => pickImage(setSelectedImage, setIsLoading)}>
            <View style={tw`w-20 h-20 mt-3`}>
              <Image 
                source={selectedImage ? { uri: selectedImage } : avatar} 
                style={[tw`w-full h-full`, { aspectRatio: 1, borderRadius: 40 }]} 
              />
              {isLoading && (
                <View style={[tw`absolute top-0 left-0 w-full h-full justify-center items-center`, { backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 40 }]}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <Text style={styles.textform}>First name</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstname}
            onChangeText={setFirstname}
          />
          <Text style={styles.textform}>Last name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastname}
            onChangeText={setLastname}
          />
          <Text style={styles.textform}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <Text style={styles.textform}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.textform}>Password</Text>
          <View style={tw`relative w-full mb-1 w-3/4`}>
          <TextInput
            style={tw`h-12 border border-[#8BACB8] rounded py-3 px-5 text-base`}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={tw`absolute right-0 top-0 h-full justify-center pr-3`}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
          <Text style={styles.textform}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="+63"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={13} 
          />
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleSignUp}
            disabled={loading}
          >
            <View style={styles.buttonContent}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.textWhite}>Sign Up</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>
              Already have an account?{" "}
              <Text style={{ color: "blue" }}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}