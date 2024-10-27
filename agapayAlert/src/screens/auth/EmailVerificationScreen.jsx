import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styles from "@styles/styles";
import verification from "@assets/verification.png";
import tw from "twrnc";
import HeaderIcon from "@components/HeaderIcon";
import { verifyEmail, resendVerificationCode, clearError } from "@redux/actions/authActions";
import { showToast } from "@utils/toastService";

export default function EmailVerificationScreen({ navigation, route }) {
  const email = route?.params?.email; // Safely access email from route.params
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60); // 60 seconds timer

  const handleTextChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 3) {
      if (index === 0) input2.current.focus();
      if (index === 1) input3.current.focus();
      if (index === 2) input4.current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      if (index === 1) input1.current.focus();
      if (index === 2) input2.current.focus();
      if (index === 3) input3.current.focus();
    }
  };

  const handleSubmit = () => {
    try {
    const verificationCode = code.join("");
      dispatch(verifyEmail(email, verificationCode));
      console.log("Email verification code:", verificationCode);
      console.log("Account verified");
      showToast("success", "Account verified successfully");
      resetInputs();
      navigation.navigate("verified");
    } catch (error) {
      console.error("Error verifying email:", error);
      dispatch(clearError());
    }
  };

  const handleResendCode = () => {
    try {
      dispatch(resendVerificationCode(email));
      setTimer(60);
    } catch (error) {
      console.error("Error resending verification code:", error);
      dispatch(clearError());
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useFocusEffect(
    React.useCallback(() => {
      setCode(["", "", "", ""]);
    }, [])
  );

  const resetInputs = () => {
    setCode(["", "", "", ""]);
  };

  return (
    <View style={styles.container}>
      <HeaderIcon />
      <View>
        <Text style={tw`font-bold text-white text-26px mb-1 text-center`}>
          Verification
        </Text>
      </View>
      <View style={tw`w-full flex-1 bg-[#F1FBFF] items-center pt-10 rounded`}>
        <Image source={verification} style={tw`w-30 h-30 mb-5`} />
        <Text style={tw`mt-2 mb-5 font-medium text-13px text-center w-3/4`}>
          We've sent a verification code to 
          <Text style={tw`text-blue-500`}> {email} </Text>. 
          Please check your inbox and enter the code below to verify your email address.
        </Text>
        <View style={tw`flex-row justify-between w-full px-10 mb-5`}>
          <TextInput
            ref={input1}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, 0)}
            onKeyPress={(e) => handleKeyPress(e, 0)}
            value={code[0]}
          />
          <TextInput
            ref={input2}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, 1)}
            onKeyPress={(e) => handleKeyPress(e, 1)}
            value={code[1]}
          />
          <TextInput
            ref={input3}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, 2)}
            onKeyPress={(e) => handleKeyPress(e, 2)}
            value={code[2]}
          />
          <TextInput
            ref={input4}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, 3)}
            onKeyPress={(e) => handleKeyPress(e, 3)}
            value={code[3]}
          />
        </View>
        <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
          <Text>
            Resend Verification in{" "}
            <Text style={tw`font-bold text-blue-500`}>{timer} second(s)</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonSecondary, timer > 0 && { opacity: 0.5 }]}
          onPress={handleResendCode}
          disabled={timer > 0}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textPrimary}>Resend Code</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleSubmit}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textWhite}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}