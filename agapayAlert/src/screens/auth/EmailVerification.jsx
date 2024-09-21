import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import styles from "@styles/styles";
import verification from "@assets/verification.png";
import tw from "twrnc";
import HeaderIcon from "@components/HeaderIcon";

export default function EmailVerification({ navigation }) {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  const handleTextChange = (text, ref) => {
    if (text.length === 1) {
      ref.current.focus();
    }
  };

  const handleKeyPress = (e, ref) => {
    if (e.nativeEvent.key === 'Backspace' && !e.target.value) {
      ref.current.focus();
    }
  };

  return (
    <View style={styles.container}>
    <HeaderIcon/>
      <View>
        <Text style={tw`font-bold text-white text-26px mb-1 text-center`}>
          Verification
        </Text>
      </View>
      <View style={tw`w-full flex-1 bg-[#F1FBFF] items-center pt-10 rounded`}>
        <Image source={verification} style={tw`w-30 h-30 mb-5`} />
        <Text style={tw`mt-2 mb-5 font-medium text-13px text-center w-3/4`}>
          We've sent a verification code to [user's email address]. Please check
          your inbox and enter the code below to verify your email address.
        </Text>
        <View style={tw`flex-row justify-between w-full px-10 mb-5`}>
          <TextInput
            ref={input1}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, input2)}
            onKeyPress={(e) => handleKeyPress(e, input1)}
          />
          <TextInput
            ref={input2}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, input3)}
            onKeyPress={(e) => handleKeyPress(e, input1)}
          />
          <TextInput
            ref={input3}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, input4)}
            onKeyPress={(e) => handleKeyPress(e, input2)}
          />
          <TextInput
            ref={input4}
            style={styles.verificationInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, input4)}
            onKeyPress={(e) => handleKeyPress(e, input3)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text>
            Resend Verification in{" "}
            <Text style={tw`font-bold text-blue-500`}>10 second(s)</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textPrimary}>Resend Code</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Address")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.textWhite}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}