import React, {useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "@components/ProgressBar";
import tw from "twrnc";

export default function ReportAP4({ nextStep, prevStep, formData, setFieldValue, errors, touched, handleChange, handleBlur }) {
    const navigation = useNavigation();
    const [hairColor, setHairColor] = useState(formData.missingPerson.currentHairColor || '');
    const [hairColorInput, setHairColorInput] = useState(formData.missingPerson.currentHairColor || '');
    const [hairSuggestions, setHairSuggestions] = useState([]);
    const [eyeColor, setEyeColor] = useState(formData.missingPerson.eyeColor || '');
    const [eyeColorInput, setEyeColorInput] = useState(formData.missingPerson.eyeColor || '');
    const [eyeSuggestions, setEyeSuggestions] = useState([]);
    const [dyedHairColor, setDyedHairColor] = useState(formData.missingPerson.dyedHairColor || false);
    const [wearsContactLenses, setWearsContactLenses] = useState(formData.missingPerson.wearsContactLenses || false);
    const hairColors = ['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White', 'Blue', 'Green', 'Pink', 'Purple', 'Orange'];
    const eyeColors = ['Black', 'Brown', 'Blue', 'Green', 'Gray', 'Hazel', 'Amber'];

    const handleHairColorChange = (text) => {
        setHairColorInput(text);
        setFieldValue('missingPerson.currentHairColor', text);
        if (text.length > 0) {
        const filteredSuggestions = hairColors.filter(color => color.toLowerCase().startsWith(text.toLowerCase()));
        setHairSuggestions(filteredSuggestions);
        } else {
        setHairSuggestions([]);
        }
    };

    const handleHairSuggestionPress = (color) => {
        setHairColorInput(color);
        setFieldValue('missingPerson.currentHairColor', color);
        setHairSuggestions([]);
    };

    const handleEyeColorChange = (text) => {
        setEyeColorInput(text);
        setFieldValue('missingPerson.eyeColor', text);
        if (text.length > 0) {
        const filteredSuggestions = eyeColors.filter(color => color.toLowerCase().startsWith(text.toLowerCase()));
        setEyeSuggestions(filteredSuggestions);
        } else {
        setEyeSuggestions([]);
        }
    };

    const handleEyeSuggestionPress = (color) => {
        setEyeColorInput(color);
        setFieldValue('missingPerson.eyeColor', color);
        setEyeSuggestions([]);
    };
    
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
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Race / Nationality</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} 
                        placeholder="Type here..."
                        value={formData.missingPerson.raceOrNationality}
                        onChangeText={handleChange("missingPerson.raceOrNationality")}
                        onBlur={handleBlur("missingPerson.raceOrNationality")}
                         />
                         {touched.missingPerson?.raceOrNationality && errors.missingPerson?.raceOrNationality && <Text style={styles.errorText}>{errors.missingPerson.raceOrNationality}</Text>}
                    <View style={tw`flex-row flex-nowrap`}>
                    <Text style={tw`text-base font-bold mt-3 mb-1 mr-4`}>Current Hair Color</Text>
                    </View>
                    <View style={tw`flex-row flex-nowrap`}>
                    <View style={tw`flex-nowrap`}>
                        <TextInput
                        style={tw`bg-white border p-2 pr-15 rounded-md shadow-md`}
                        placeholder='Type here...'
                        value={hairColorInput}
                        onChangeText={handleHairColorChange}
                        />
                    </View>
                    <View style={tw`flex-row mt-1 mx-2`}>
                        <RadioButton
                        color="#050C9C"
                        value="natural"
                        status={!dyedHairColor ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setDyedHairColor(false);
                            setFieldValue('missingPerson.dyedHairColor', false);
                        }}
                        />
                        <Text style={tw`mt-2 mr-2`}>Natural</Text>
                        <RadioButton
                        color="#050C9C"
                        value="dyed"
                        status={dyedHairColor ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setDyedHairColor(true);
                            setFieldValue('missingPerson.dyedHairColor', true);
                        }}
                        />
                        <Text style={tw`mt-2`}>Dyed</Text>
                    </View>
                    </View>
                    <View style={tw`flex-row flex-nowrap`}>
                    <Text style={tw`text-base font-bold mt-3 mb-1 mr-4`}>Eye Color</Text>
                    </View>
                    <View style={tw`flex-row flex-nowrap`}>
                    <View style={tw`flex-nowrap`}>
                        <TextInput
                        style={tw`bg-white border p-2 pr-15 rounded-md shadow-md`}
                        placeholder='Type here...'
                        value={eyeColorInput}
                        onChangeText={handleEyeColorChange}
                        />
                    </View>
                    <View style={tw`flex-row mt-1 mx-2`}>
                        <RadioButton
                        color="#050C9C"
                        value="natural"
                        status={!wearsContactLenses ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setWearsContactLenses(false);
                            setFieldValue('missingPerson.wearsContactLenses', false);
                        }}
                        />
                        <Text style={tw`mt-2 mr-2`}>Natural</Text>
                        <RadioButton
                        color="#050C9C"
                        value="contacts"
                        status={wearsContactLenses ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setWearsContactLenses(true);
                            setFieldValue('missingPerson.wearsContactLenses', true);
                        }}
                        />
                        <Text style={tw`text-xs mt-2.5`}>Contacts</Text>
                    </View>
                    </View>
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Blood Type</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.bloodType}
                    onChangeText={handleChange("missingPerson.bloodType")}
                    onBlur={handleBlur("missingPerson.bloodType")}
                    />
                    {touched.missingPerson?.bloodType && errors.missingPerson?.bloodType && <Text style={styles.errorText}>{errors.missingPerson.bloodType}</Text>}
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Scars, Marks, and/or tattoo/es</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.scarsOrMarks}
                    onChangeText={handleChange("missingPerson.scarsOrMarks")}
                    onBlur={handleBlur("missingPerson.scarsOrMarks")}
                    />
                    {touched.missingPerson?.scarsOrMarks && errors.missingPerson?.scarsOrMarks && <Text style={styles.errorText}>{errors.missingPerson.scarsOrMarks}</Text>}
                    <Text style={tw`text-base font-bold mt-3 mb-1`}>Prosthetics and/or Implants</Text>
                    <TextInput
                    style={tw`bg-white border p-2 rounded-md shadow-md`}
                    placeholder='Type here...'
                    value={formData.missingPerson.prostheticsOrImplants}
                    onChangeText={handleChange("missingPerson.prostheticsOrImplants")}
                    onBlur={handleBlur("missingPerson.prostheticsOrImplants")}
                    />
                    {touched.missingPerson?.prostheticsOrImplants && errors.missingPerson?.prostheticsOrImplants && <Text style={styles.errorText}>{errors.missingPerson.prostheticsOrImplants}</Text>}
                        <View style={tw`flex-row pt-4 gap-4`}>
                            <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, {backgroundColor: 'white', borderColor: '#123f7b' }]}  onPress={prevStep}>
                                <Text style={tw`text-black text-center`}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4 border`, {backgroundColor: '#DAF5FF', borderColor: '#050C9C' }]}  onPress={nextStep}>
                            <Text style={tw`text-[#050C9C] text-center`}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}