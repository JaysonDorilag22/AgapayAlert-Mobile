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
import { login, clearError } from "@redux/actions/authActions";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "@utils/toastService";
import { Formik } from "formik";
import { loginSchema } from "@validations/login";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      showToast("success", "Login successful");
      if (user.role === "admin") {
        navigation.navigate("AdminDashboardScreen");
      } else {
        navigation.navigate("Home");
      }
    } else if (error) {
      showToast("error", error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigation, dispatch, user]);

  const handleLogin = (values, { setSubmitting }) => {
    dispatch(login(values.email, values.password));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <Image source={icon1} style={tw`w-80 h-80`} />

          <View style={styles.form}>
            <Text style={styles.textform}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Text style={styles.textform}>Password</Text>

            <View style={tw`relative w-full mb-4 w-3/4`}>
              <TextInput
                style={tw`h-12 border border-[#8BACB8] rounded py-3 px-5 text-base`}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
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
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
        </View>
      )}
    </Formik>
  );
}