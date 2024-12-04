import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import ProgressBar from '@components/ProgressBar';
import { showToast } from '@utils/toastService';
import { InformStep1Schema } from '@validations/InformStep1';
import { InformStep2Schema } from '@validations/InformStep2';
import InformScreenS1 from './InformScreenS1';
import InformScreenS2 from './InformScreenS2';
import { addSighting } from '@redux/actions/sightingActions';

export default function InformScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { report } = route.params;
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    //initialize report id
    const initializeValues = {
        report: "",
        userId: "",
        locationSeen: "",
        dateSeen: "",
        description: "",
        identificationId: {
          category: "",
          image: {
            public_id: "",
            url: "",
          },
        },
        status: "Pending",
      };

    const getValidationSchema = () => {
        switch (step) {
          case 1:
            return InformStep1Schema;
          case 2:
            return InformStep2Schema;
          default:
            return InformStep1Schema;
        }
    };

    const extractErrorMessages = (errors) => {
        const message = [];
        for (const key in errors) {
          if (typeof errors[key] === 'object') {
            message.push(extractErrorMessages(errors[key]));
          } else {
            message.push(errors[key]);
          }
        }
        return message;
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
                showToast(errorMessages, "error");
                console.log("Error messages:", errorMessages);
            }
        }
    };

    const prevStep = () => setStep(step - 1);

    const handleInform = async (values, {resetForm}) => {
      try {
        console.log('Inform values:', values);
        
        const formData = new FormData();

        formData.append('report', report._id);
        formData.append('userId', currentUser._id);
        formData.append('locationSeen', values.locationSeen);
        formData.append('dateSeen', values.dateSeen.toISOString());
        formData.append('description', values.description);
        formData.append('identificationId[category]', values.identificationId.category);
        
        console.log('Form Data:', formData);

        await dispatch(addSighting(formData));
        showToast('success', 'Sighting added successfully');
        navigation.navigate('Report');
        resetForm();
        setStep(1);
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Failed to add sighting');
        dispatch({ type: CREATE_SIGHTING_FAIL, payload: error.message });
      }
    };

    return (
        <Formik
        initialValues={initializeValues}
        validationSchema={getValidationSchema()}
        onSubmit={handleInform}
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
                <View style={{flex: 1}}>
                    <ProgressBar step={step} totalSteps={2} />
                    {step === 1 && (
                        <InformScreenS1
                        nextStep={() => nextStep(validateForm)}
                        formData={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    )}
                    {step === 2 && (
                       <InformScreenS2
                        prevStep={prevStep}
                        handleInform={handleSubmit}
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
    )


}
