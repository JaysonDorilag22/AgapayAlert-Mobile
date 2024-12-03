import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import ProgressBar from '@components/ProgressBar';

export default function ReportAP5({  
    prevStep,
    formData,
    setFieldValue,
    handleReport,
    errors,
    touched,
    handleChange,
    handleBlur}) {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1`}>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
                <View>
                    <Text style={tw`font-bold text-22px mb-1 text-center`}>Absent Person's Information</Text>
                </View>
                <View style={tw`flex-row px-4`}>
                    <Text style={tw`text-sm ml-4 text-center`}>Input the following details about the missing person.</Text>
                </View>
                <ScrollView>
                <View style={tw`justify-start p-4`}>
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Known Clothing and/or Accessories</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.lastKnownClothing}
                    onChangeText={handleChange("missingPerson.lastKnownClothing")}
                    onBlur={handleBlur("missingPerson.lastKnownClothing")}
                    />
                    {touched.missingPerson?.lastKnownClothing && errors.missingPerson?.lastKnownClothing && <Text style={styles.errorText}>{errors.missingPerson.lastKnownClothing}</Text>}
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Medication</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.medication}
                    onChangeText={handleChange("missingPerson.medication")}
                    onBlur={handleBlur("missingPerson.medication")}
                    />
                    {touched.missingPerson?.medication && errors.missingPerson?.medication && <Text style={styles.errorText}>{errors.missingPerson.medication}</Text>}
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Birth Defects</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.birthDefects}
                    onChangeText={handleChange("missingPerson.birthDefects")}
                    onBlur={handleBlur("missingPerson.birthDefects")}
                    />
                    {touched.missingPerson?.birthDefects && errors.missingPerson?.birthDefects && <Text style={styles.errorText}>{errors.missingPerson.birthDefects}</Text>}
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Contact Number</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.contactNumber}
                    onChangeText={handleChange("missingPerson.contactNumber")}
                    onBlur={handleBlur("missingPerson.contactNumber")}
                    />
                    {touched.missingPerson?.contactNumber && errors.missingPerson?.contactNumber && <Text style={styles.errorText}>{errors.missingPerson.contactNumber}</Text>}
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Social Media Account</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.socialMediaAccount}
                    onChangeText={handleChange("missingPerson.socialMediaAccount")}
                    onBlur={handleBlur("missingPerson.socialMediaAccount")}
                    />
                    {touched.missingPerson?.socialMediaAccount && errors.missingPerson?.socialMediaAccount && <Text style={styles.errorText}>{errors.missingPerson.socialMediaAccount}</Text>}
                    <View style={tw`flex-row pt-4 gap-4`}>
                    <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, { backgroundColor: 'white', borderColor: '#123f7b' }]} onPress={prevStep}>
                        <Text style={tw`text-black text-center`}>Back</Text>
                    </TouchableOpacity>
                    <Button title="Submit" onPress={handleReport} />
                    </View>
                </View>
                <View style={tw`mb-20`} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}