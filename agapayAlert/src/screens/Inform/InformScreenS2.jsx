import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Button } from "react-native"; 
import tw from "twrnc";
import styles from "@styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

export default function InformScreenS2({ prevStep, formData, setFormData, errors, touched, handleChange, handleBlur, handleInform, setFieldValue }) {
    const [Identification, setIdentification] = useState(formData.identificationId.category || "");

    const IdentificationOptions = [
        { label: 'School ID', value: 'School ID' },
        { label: 'Barangay ID', value: 'Barangay ID' },
        { label: 'Government ID', value: 'Government ID' },
    ];

    return (
        <View style={tw`flex-1`}>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
            <View>
                    <Text style={tw`font-bold text-22px mb-1 text-center`}>Informant's Information</Text>
                </View>
                <View>
                    <View style={tw`flex-row px-4`}>
                    <Text style={tw`text-sm ml-4 text-center`}>Input the following details about your personal details.</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={tw`justify-start p-4`}>
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Identification</Text>
                        <View style={tw`border rounded-md shadow-md`}>
                        <RNPickerSelect
                        onValueChange={(value) => {
                            setIdentification(value);
                            setFieldValue('identificationId.category', value);
                        }}
                        items={IdentificationOptions}
                        placeholder={{ label: "Select ID", value: null }}
                        style={{
                            viewContainer: tw`bg-white p-1 rounded-md`,
                            inputAndroid: tw`bg-white rounded-md`,
                            placeholder: { color: 'gray' },
                        }}
                        value={Identification}
                        />
                        </View>
                        {touched.identificationId?.category && errors.identificationId?.category && <Text style={styles.errorText}>{errors.identificationId.category}</Text>}
                        <View style={tw`flex-row pt-4 gap-4`}>
                        <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, { backgroundColor: 'white', borderColor: '#123f7b' }]} onPress={prevStep}>
                        <Text style={tw`text-black text-center`}>Back</Text>
                        </TouchableOpacity>
                        <Button title="Submit" onPress={handleInform} />
                        </View>
                    </View>
                    <View style={tw`mb-20`} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}