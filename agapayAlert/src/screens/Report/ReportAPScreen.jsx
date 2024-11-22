import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { addReport, clearError } from "@redux/actions/reportActions";
import { getUserInfo } from "@redux/actions/userActions";
import ReportAP from "./ReportAP";
import ReportAP2 from "./ReportAP2";
import ReportAP3 from "./ReportAP3";
import ReportAP4 from "./ReportAP4";
import ReportAP5 from "./ReportAP5";
import {ReportStep2Schema} from "@validations/ReportStep2";
import {ReportStep3Schema} from "@validations/ReportStep3";
import ProgressBar from "@components/ProgressBar";
import { showToast } from "@utils/toastService";
import * as FileSystem from 'expo-file-system';

export default function ReportAPScreen({ navigation }) {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user); // Assuming you have an auth state with the current user
    const initialValues = {
      reporter: {
        _id: '',
        relationship: '',
      },
        missingPerson: {
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
          images: [
            {
              public_id: '',
              url: '',
            },
          ],
          video: {
            public_id: '',
            url: '',
          },
          medication: '',
          birthDefects: '',
          contactNumber: '',
          socialMediaAccount: '',
        },
        status: 'Pending', // Default value
        category: 'Missing', // New field added
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

    const nextStep = async (validateForm) => {
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

      // Create FormData object
      const formData = new FormData();
    
      // Reporter Information
      formData.append("reporter", currentUser._id); // Assuming 'reporter.id' is the ObjectId of the reporter
      formData.append("relationship", values.reporter.relationship); // Relationship of the reporter to the missing person
    
      // Missing Person Information
      formData.append("missingPerson[firstname]", values.missingPerson.firstname);
      formData.append("missingPerson[lastname]", values.missingPerson.lastname);
      formData.append("missingPerson[dateOfBirth]", values.missingPerson.dateOfBirth); // Ensure date is in ISO string format
      formData.append("missingPerson[age]", values.missingPerson.age);
      formData.append("missingPerson[assignedSexAtBirth]", values.missingPerson.assignedSexAtBirth);
      formData.append("missingPerson[scarsOrMarks]", values.missingPerson.scarsOrMarks);
      formData.append("missingPerson[prostheticsOrImplants]", values.missingPerson.prostheticsOrImplants);
      formData.append("missingPerson[lastKnownClothing]", values.missingPerson.lastKnownClothing);
      formData.append("missingPerson[lastKnownLocation]", values.missingPerson.lastKnownLocation);
      formData.append("missingPerson[lastSeen]", values.missingPerson.lastSeen);
      formData.append("missingPerson[causeOfDisappearance]", values.missingPerson.causeOfDisappearance);
      formData.append("missingPerson[currentHairColor]", values.missingPerson.currentHairColor);
      formData.append("missingPerson[dyedHairColor]", values.missingPerson.dyedHairColor);
      formData.append("missingPerson[alias]", values.missingPerson.alias);
      formData.append("missingPerson[genderIdentity]", values.missingPerson.genderIdentity);
      formData.append("missingPerson[height]", values.missingPerson.height);
      formData.append("missingPerson[weight]", values.missingPerson.weight);
      formData.append("missingPerson[raceOrNationality]", values.missingPerson.raceOrNationality);
      formData.append("missingPerson[eyeColor]", values.missingPerson.eyeColor);
      formData.append("missingPerson[wearsContactLenses]", values.missingPerson.wearsContactLenses);
      formData.append("missingPerson[bloodType]", values.missingPerson.bloodType);
      formData.append("missingPerson[medication]", values.missingPerson.medication);
      formData.append("missingPerson[birthDefects]", values.missingPerson.birthDefects);
      formData.append("missingPerson[contactNumber]", values.missingPerson.contactNumber);
      formData.append("missingPerson[socialMediaAccount]", values.missingPerson.socialMediaAccount);
    
      // Append images
      values.missingPerson.images.forEach((image, index) => {
        if (image.url && typeof image.url === 'string' && image.url.startsWith("file://")) {
          const fileName = image.url.split("/").pop(); // Extract the file name
          formData.append(`missingPerson.images[${index}].url`, {
            uri: image.url,
            type: "image/jpeg", // or the appropriate type
            name: fileName,
          });
        } else if (image.url && typeof image.url === 'string') {
          formData.append(`missingPerson.images[${index}].url`, image.url);
        }
        formData.append(`missingPerson.images[${index}].public_id`, image.public_id);
      });
    
      // Append video (if applicable)
      if  (values.missingPerson.video.url) {
        if (values.missingPerson.video.url.startsWith("file://")) {
          formData.append("missingPerson.video", {
            uri: values.missingPerson.video.url,
            type: "video/mp4", // Ensure correct type
            name: "video.mp4",
          });
        }
      }
    
      // Category and Status
      formData.append("category", "Missing"); // Missing, Abducted, etc.
      formData.append("status", "Pending"); // Default status
    
      console.log("Form data:", formData);
      
      try {
        // Dispatch the action to create the report
        const response = await dispatch(addReport(formData));
    
        if (response && response.type === "ADD_REPORT_SUCCESS") {
          console.log("Report submission successful");
          showToast("success", "Report submitted successfully");
          resetForm({ values: initialValues });
          setStep(1);
        } else {
          console.error("Report submission failed:", response?.message || "Unknown error");
          showToast("error", "Report submission failed");
          setStep(5);
        }
      } catch (error) {
        console.error("Report submission error:", error);
        showToast("error", error.message || "An error occurred");
        setStep(5);
        dispatch(clearError());
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
                    {step === 1 && (
                        <ReportAP
                        nextStep={() => nextStep(validateForm)}
                        prevStep={prevStep}
                        formData={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        />
                    )}
                    {step === 2 && (
                        <ReportAP2
                        nextStep={() => nextStep(validateForm)}
                        prevStep={prevStep}
                        formData={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        />
                    )}
                    {step === 3 && (
                        <ReportAP3
                        nextStep={() => nextStep(validateForm)}
                        prevStep={prevStep}
                        formData={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        />
                    )}
                    {step === 4 && (
                        <ReportAP4
                        nextStep={() => nextStep(validateForm)}
                        prevStep={prevStep}
                        formData={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        />
                    )}
                    {step === 5 && (
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