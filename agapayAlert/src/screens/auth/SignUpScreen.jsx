import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import styles from "@styles/styles";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";
import { signup } from "@redux/actions/authActions";
import ProgressBar from "@components/ProgressBar";
import { signUpStep1Schema } from "@validations/signUpStep1";
import { signUpStep2Schema } from "@validations/signUpStep2";
import { signUpStep3Schema } from "@validations/signUpStep3";

export default function SignUpScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const getValidationSchema = () => {
    switch (step) {
      case 1:
        return signUpStep1Schema;
      case 2:
        return signUpStep2Schema;
      case 3:
        return signUpStep3Schema;
      default:
        return signUpStep1Schema;
    }
  };

  const extractErrorMessages = (errors) => {
    const messages = [];
    for (const key in errors) {
      if (typeof errors[key] === 'object') {
        messages.push(...extractErrorMessages(errors[key]));
      } else {
        messages.push(errors[key]);
      }
    }
    return messages;
  };

  const nextStep = async (validateForm) => {
    const errors = await validateForm();
    console.log("Validation Errors:", errors); 
    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
    } else {
      const errorMessages = extractErrorMessages(errors).join(', ');
      Toast.show({
        type: 'error',
        text1: errorMessages,
      });
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSignUp = async (values) => {
    try {
      console.log("Form Data:", values); // Log formData before sending it to the backend
      await dispatch(signup(values));
      Toast.show({
        type: 'success',
        text1: 'Sign up successful',
      });
      navigation.navigate('verification', { email: values.email });
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        age: "",
        email: "",
        phoneNo: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
        avatar: null,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={getValidationSchema()}
      onSubmit={handleSignUp}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, validateForm }) => (
        <View style={{ flex: 1 }}>
          <ProgressBar step={step} totalSteps={3} />
          {step === 1 && (
            <SignUpStep1
              nextStep={() => nextStep(validateForm)}
              formData={values}
              setFormData={setFieldValue}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {step === 2 && (
            <SignUpStep2
              nextStep={() => nextStep(validateForm)}
              prevStep={prevStep}
              formData={values}
              setFormData={setFieldValue}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {step === 3 && (
            <SignUpStep3
              prevStep={prevStep}
              handleSignUp={handleSubmit}
              formData={values}
              setFormData={setFieldValue}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              validateForm={validateForm}
            />
          )}
        </View>
      )}
    </Formik>
  );
}