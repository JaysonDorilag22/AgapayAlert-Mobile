import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import ReportAP from "./ReportAP";
import ReportAP2 from "./ReportAP2";
import ReportAP3 from "./ReportAP3";
import ReportAP4 from "./ReportAP4";
import ReportAP5 from "./ReportAP5";
import ProgressBar from "@components/ProgressBar";

export default function ReportAPScreen({ navigation }) {
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const prevStep = () => setStep(step - 1);
    const initialValues = {
        reporter: '', // Assuming you will set this dynamically
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
      };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ values, 
            handleChange, 
            setFieldValue 
            }) => (
                <View style={{ flex: 1 }}>
                    <ProgressBar step={step} />
                    {step === 1 && (
                        <ReportAP
                            nextStep={() => setStep(step + 1)}
                            formData={values}
                            setFormData={setFieldValue}
                            handleChange={handleChange}
                        />
                    )}
                    {step === 2 && (
                        <ReportAP2
                            nextStep={() => setStep(step + 1)}
                            prevStep={prevStep}
                            formData={values}
                            setFormData={setFieldValue}
                            handleChange={handleChange}
                        />
                    )}
                    {step === 3 && (
                        <ReportAP3
                            nextStep={() => setStep(step + 1)}
                            prevStep={prevStep}
                            formData={values}
                            setFormData={setFieldValue}
                            handleChange={handleChange}
                        />
                    )}
                    {step === 4 && (
                        <ReportAP4
                            nextStep={() => setStep(step + 1)}
                            prevStep={prevStep}
                            formData={values}
                            setFormData={setFieldValue}
                            handleChange={handleChange}
                        />
                    )}
                    {step === 5 && (
                        <ReportAP5
                            prevStep={prevStep}
                            formData={values}
                            setFormData={setFieldValue}
                            handleChange={handleChange}
                        />
                    )}
                    
                </View>
            )}
        </Formik>
    );
}