import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import avatar from '@assets/avatar.png';
import tw from 'twrnc';
import ProgressBar from '@components/ProgressBar';

export default function ReportAP4() {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        calculateAge(currentDate);
      };
    
      const showDatepicker = () => {
        setShow(true);
      };

    return (
        <View style={tw`flex-1`}>
            <ProgressBar step={4} totalSteps={5} />
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
                <View>
                    <Text style={tw`font-bold text-22px mb-1 text-center`}>Absent Person's Information</Text>
                </View>
                <View style={tw`flex-row px-4`}>
                    <Text style={tw`text-sm ml-4 text-center`}>Input the following details about the missing person.</Text>
                </View>
                <ScrollView>
                    <View style={tw`justify-start p-4`}>
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Most Recent Picture</Text>
                        <View style={tw`flex-row items-center justify-center my-2`}>
                            <Image source={require('@assets/avatar.png')} style={tw`w-20 h-20`} />
                        </View>
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Known Clothing and/or Accessories</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Known Location</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Date Last Seen</Text>
                        <TouchableOpacity onPress={showDatepicker} style={tw`bg-white border p-3 rounded-md shadow-md pr-8 grow-0 shrink-0`}>
                        <Text>{date.toDateString()}</Text>
                        </TouchableOpacity>
                        {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            maximumDate={new Date()}
                            onChange={onChange}
                        />
                        )}
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Medication</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Birth Defects</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <View style={tw`flex-row pt-4 gap-4`}>
                            <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, {backgroundColor: 'white', borderColor: '#123f7b' }]}  onPress={() => navigation.navigate("ReportAP3")}>
                                <Text style={tw`text-black text-center`}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4 border`, {backgroundColor: '#DAF5FF', borderColor: '#050C9C' }]}  onPress={() => navigation.navigate("ReportAP5")}>
                            <Text style={tw`text-[#050C9C] text-center`}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}