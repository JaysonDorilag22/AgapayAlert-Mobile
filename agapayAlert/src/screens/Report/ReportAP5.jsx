import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import ProgressBar from '@components/ProgressBar';

export default function ReportAP5() {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1`}>
            <ProgressBar step={5} totalSteps={5} />
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
                <View>
                    <Text style={tw`font-bold text-22px mb-1 text-center`}>Absent Person's Information</Text>
                </View>
                <View style={tw`flex-row px-4`}>
                    <Text style={tw`text-sm ml-4 text-center`}>Input the following details about the missing person.</Text>
                </View>
                <ScrollView>
                    <View style={tw`justify-start p-4`}>
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Contact Number</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Social Media Account</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Cause of Disappearance</Text>
                        <TextInput
                            style={tw`bg-white border p-2 rounded-md shadow-md`}
                            placeholder='Type here...'
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                        />
                         <View style={tw`flex-row pt-4 gap-4`}>
                            <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, {backgroundColor: 'white', borderColor: '#123f7b' }]}  onPress={() => navigation.navigate("ReportAP4")}>
                                <Text style={tw`text-black text-center`}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4 border`, {backgroundColor: '#123f7b' }]}  onPress={() => navigation.navigate("Home")}>
                                <Text style={tw`text-white text-center`}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}