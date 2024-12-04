import React from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import tw from "twrnc";
import styles from "@styles/styles";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function InformScreenS1({ nextStep, formData, setFormData, errors, touched, handleChange, handleBlur, setFieldValue }) {
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    
    const onChange = (event, selectedDate) => {
        console.log("selectedDate:", selectedDate);
        const currentDate = selectedDate || date;
        console.log("currentDate:", currentDate);
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setFieldValue("dateSeen", currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
        console.log("formDataS1:", formData);
    };

    return (
        <View style={tw`flex-1`}>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
                <View>
                    <Text style={tw`font-bold text-22px mb-1 text-center`}>Absent Person's Information</Text>
                </View>
                <View>
                    <View style={tw`flex-row px-4`}>
                    <Text style={tw`text-sm ml-4 text-center`}>Input the following details about the missing person.</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={tw`justify-start p-4`}>
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Location Seen</Text>
                        <TextInput
                            style={tw`bg-white border p-2 rounded-md shadow-md`}
                            placeholder="Type here..."
                            value={formData.locationSeen}
                            onChangeText={handleChange("locationSeen")}
                            onBlur={handleBlur("locationSeen")}
                        />
                        {touched.locationSeen && errors.locationSeen && <Text style={styles.errorText}>{errors.locationSeen}</Text>}
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Date Seen</Text>
                        <View style={tw`flex-nowrap mr-7`}>
                            <TouchableOpacity onPress={showDatepicker} style={tw`bg-white border p-3 rounded-md shadow-md pr-8 grow-0 shrink-0`}>
                                <Text>
                                {date.toDateString()}
                                </Text>
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
                        </View>
                        {touched.dateSeen && errors.dateSeen && <Text style={styles.errorText}>{errors.dateSeen}</Text>}
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Description</Text>
                        <TextInput
                            style={tw`bg-white border p-2 rounded-md shadow-md`}
                            placeholder='Type here...'
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            value={formData.description}
                            onChangeText={handleChange("description")}
                            onBlur={handleBlur("description")}
                        />
                        {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                        <View style={tw`flex-row pt-4`}>
                            <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4 border`, { backgroundColor: '#DAF5FF', borderColor: '#050C9C' }]} onPress={nextStep}>
                            <Text style={tw`text-[#050C9C] text-center`}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={tw`mb-20`} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );

}
