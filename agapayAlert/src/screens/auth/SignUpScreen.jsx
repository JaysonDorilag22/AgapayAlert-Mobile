import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";
import { signup, clearError } from "@redux/actions/authActions";
import ProgressBar from "@components/ProgressBar";
import { signUpStep1Schema } from "@validations/signUpStep1";
import { signUpStep2Schema } from "@validations/signUpStep2";
import { signUpStep3Schema } from "@validations/signUpStep3";
import { showToast } from "@utils/toastService";

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
      if (typeof errors[key] === "object") {
        messages.push(...extractErrorMessages(errors[key]));
      } else {
        messages.push(errors[key]);
      }
    }
    return messages;
  };

  const nextStep = async (validateForm) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
    } else {
      const errorMessages = extractErrorMessages(errors).join(", ");
      showToast("error", errorMessages);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSignUp = async (values, { resetForm }) => {
    try {
      console.log("Sign up values:", values);
  
      // Check if avatar is a valid file URI
      if (values.avatar && values.avatar.startsWith("file://")) {
        const formData = new FormData();
        for (const key in values) {
          if (key === "avatar") {
            formData.append("avatar", {
              uri: values.avatar,
              type: "image/jpeg", // or the appropriate type
              name: "avatar.jpg", // or the appropriate name
            });
          } else {
            formData.append(key, values[key]);
          }
        }
        console.log("FormData for sign up:", formData);
  
        await dispatch(signup(formData));
      } else {
        await dispatch(signup(values));
      }
  
      console.log("Sign up successful, navigating to verification");
      navigation.navigate("verification", { email: values.email });
      const { avatar, ...rest } = values;
      resetForm({ values: { ...rest, avatar } });
      setStep(1);
    } catch (error) {
      console.error("Sign up error:", error);
      showToast("error", error.message);
      dispatch(clearError());
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
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        validateForm,
      }) => (
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