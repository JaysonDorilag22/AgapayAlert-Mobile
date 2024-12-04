import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { clearError, createReport } from "@redux/actions/reportActions";
import ReportAP from "./ReportAP";
import ReportAP2 from "./ReportAP2";
import ReportAP3 from "./ReportAP3";
import ReportAP4 from "./ReportAP4";
import ReportAP5 from "./ReportAP5";
import { ReportStep2Schema } from "@validations/ReportStep2";
import { ReportStep3Schema } from "@validations/ReportStep3";
import ProgressBar from "@components/ProgressBar";
import { showToast } from "@utils/toastService";

export default function ReportAPScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user); // Assuming you have an auth state with the current user
  const initialValues = {
    reporter: {
      _id: '',
    },
    missingPerson: {
      relationship: '',
      firstname: '',
      lastname: '',
      dateOfBirth: '',
      age: '',
      assignedSexAtBirth: '',
      scarsOrMarks: '',
      prostheticsOrImplants: '',
      lastKnownClothing: '',
      lastKnownLocation: '',
      lastSeen: '',
      causeOfDisappearance: '',
      currentHairColor: '',
      dyedHairColor: false, // New field added
      alias: '',
      genderIdentity: '',
      height: '',
      weight: '',
      raceOrNationality: '',
      eyeColor: '',
      wearsContactLenses: false,
      bloodType: '',
      reward: '',
      medication: '',
      birthDefects: '',
      contactNumber: '',
      socialMediaAccount: '',
    },
    status: 'Pending', // Default value
    category: 'Missing', // New field added
    images: [],
    video: null,
  };

  const getValidationSchema = () => {
    switch (step) {
      case 2:
        return ReportStep2Schema;
      case 3:
        return ReportStep3Schema;
      default:
        return ReportStep2Schema;
    }
  }

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
  }

  const nextStep = async (validateForm, values) => {
    console.log("Current step data:", values);
    if (step === 1) {
      setStep(step + 1);
    } else {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        setStep(step + 1);
      } else {
        const errorMessages = extractErrorMessages(errors).join(", ");
        showToast("error", errorMessages);
        console.log("Error messages:", errorMessages);
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleReport = async (values, { resetForm }) => {
    setLoading(true);
    const formData = new FormData();
  
    formData.append("reporter", currentUser._id);
  
    Object.keys(values.missingPerson).forEach(key => {
      formData.append(`missingPerson[${key}]`, values.missingPerson[key]);
    });
  
    if (Array.isArray(values.images)) {
      values.images.forEach((image, index) => {
        if (image && image.uri && typeof image.uri === 'string' && image.uri.startsWith("file://")) {
          const fileName = image.uri.split("/").pop();
          formData.append("images", {
            uri: image.uri,
            type: "image/jpeg",
            name: fileName,
          });
        } else if (image && image.url && typeof image.url === 'string') {
          formData.append(`images[${index}].url`, image.url);
        }
        if (image.public_id) {
          formData.append(`images[${index}].public_id`, image.public_id);
        }
      });
    }
  
    if (values.video && values.video.url) {
      if (values.video.url.startsWith("file://")) {
        formData.append("video.file", {
          uri: values.video.url,
          type: "video/mp4",
          name: "video.mp4",
        });
      } else {
        formData.append("video.url", values.video.url);
      }
      formData.append("video.public_id", values.video.public_id);
    }
  
    formData.append("status", values.status);
    formData.append("category", values.category);
  
    console.log("Form data:", formData);
  
    try {
      await dispatch(createReport(formData));
      console.log("Report submission successful");
      showToast("success", "Report submitted successfully");
      resetForm({ values: initialValues });
      setStep(1);
    } catch (error) {
      console.error("Report submission error:", error);
      showToast("error", error.message || "An error occurred");
      setStep(5);
      dispatch(clearError());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema()}
      onSubmit={handleReport}
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
          <ProgressBar step={step} totalSteps={5} />
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {!loading && step === 1 && (
            <ReportAP
              nextStep={() => nextStep(validateForm, values)}
              prevStep={prevStep}
              formData={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {!loading && step === 2 && (
            <ReportAP2
              nextStep={() => nextStep(validateForm, values)}
              prevStep={prevStep}
              formData={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {!loading && step === 3 && (
            <ReportAP3
              nextStep={() => nextStep(validateForm, values)}
              prevStep={prevStep}
              formData={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {!loading && step === 4 && (
            <ReportAP4
              nextStep={() => nextStep(validateForm, values)}
              prevStep={prevStep}
              formData={values}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
          {!loading && step === 5 && (
            <ReportAP5
              prevStep={prevStep}
              handleReport={handleSubmit}
              formData={values}
              setFieldValue={setFieldValue}
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