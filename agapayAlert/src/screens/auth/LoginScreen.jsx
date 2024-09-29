import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "@styles/styles";
import icon1 from "@assets/icon1.png";
import google from "@assets/google.png";
import { login } from "@redux/actions/authActions";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      Toast.show({
        type: "success",
        text1: "Login successful!",
      });
      navigation.navigate("Home");
    } else if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
    setLoading(false);
  }, [isAuthenticated, error, navigation]);

  const handleLogin = async () => {
    setLoading(true);
    dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <Image source={icon1} style={tw`w-80 h-80`} />

      <View style={styles.form}>
        <Text style={styles.textform}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.textform}>Password</Text>

        <View style={tw`relative w-full mb-4 w-3/4`}>
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

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textWhite}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("SignUp")}
        >
          <View style={styles.buttonContent}>
            <Image source={google} style={tw`w-6 h-6`} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text>
            Don’t have an account?{" "}
            <Text style={{ color: "blue" }}> Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}