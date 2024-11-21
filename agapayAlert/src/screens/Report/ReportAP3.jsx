import React, {useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Platform, KeyboardAvoidingView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "@components/ProgressBar";
import tw from "twrnc";

export default function ReportAP3() {
    const navigation = useNavigation();
    const [hairColor, setHairColor] = useState('natural');
    const [hairColorInput, setHairColorInput] = useState('');
    const [hairSuggestions, setHairSuggestions] = useState([]);
    const [eyeColor, setEyeColor] = useState('natural');
    const [eyeColorInput, setEyeColorInput] = useState('');
    const [eyeSuggestions, setEyeSuggestions] = useState([]);
    const hairColors = ['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White', 'Blue', 'Green', 'Pink', 'Purple', 'Orange'];
    const eyeColors = ['Black', 'Brown', 'Blue', 'Green', 'Gray', 'Hazel', 'Amber'];

    const handleHairColorChange = (text) => {
        setHairColorInput(text);
        if (text.length > 0) {
        const filteredSuggestions = hairColors.filter(color => color.toLowerCase().startsWith(text.toLowerCase()));
        setHairSuggestions(filteredSuggestions);
        } else {
        setHairSuggestions([]);
        }
    };

    const handleHairSuggestionPress = (color) => {
        setHairColorInput(color);
        setHairSuggestions([]);
    };

    const handleEyeColorChange = (text) => {
        setEyeColorInput(text);
        if (text.length > 0) {
        const filteredSuggestions = eyeColors.filter(color => color.toLowerCase().startsWith(text.toLowerCase()));
        setEyeSuggestions(filteredSuggestions);
        } else {
        setEyeSuggestions([]);
        }
    };

    const handleEyeSuggestionPress = (color) => {
        setEyeColorInput(color);
        setEyeSuggestions([]);
    };
    
    return (
        <View style={tw`flex-1`}>
            <ProgressBar step={3} totalSteps={5} />
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
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
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
                                    {/* {hairSuggestions.length > 0 && (
                                    <View style={tw`babsolute container max-h-20 overflow-scroll`}>
                                        {hairSuggestions.map((item) => (
                                        <View style={tw`flex-row opacity-25 pr-6 bg-white pt-0.25 mt-1`}>
                                            <TouchableOpacity key={item} onPress={() => handleHairSuggestionPress(item)} style={tw`p-2 `}>
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        ))}
                                    </View>
                                    )} */}
                                </View>
                            <View style={tw`flex-row mt-1 mx-2`}>
                                <RadioButton
                                color="#050C9C"
                                value="natural"
                                status={hairColor === 'natural' ? 'checked' : 'unchecked'}
                                onPress={() => setHairColor('natural')}
                                />
                                <Text style={tw`mt-2 mr-2`}>Natural</Text>
                                <RadioButton
                                color="#050C9C"
                                value="dyed"
                                status={hairColor === 'dyed' ? 'checked' : 'unchecked'}
                                onPress={() => setHairColor('dyed')}
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
                                    {/* {eyeSuggestions.length > 0 && (
                                    <View style={tw`absolute container max-h-20 overflow-scroll`}>
                                    <FlatList
                                        data={eyeSuggestions}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleEyeSuggestionPress(item)} style={tw`p-2 `}>
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                        )}
                                        style={tw`flex-row opacity-25 pr-6 bg-white pt-0.25 mt-1`}
                                    />
                                    </View>
                                     )} */}
                                </View>
                            <View style={tw`flex-row mt-1 mx-2`}>
                                <RadioButton
                                color="#050C9C"
                                status={eyeColor === 'natural' ? 'checked' : 'unchecked'}
                                onPress={() => setEyeColor('natural')}
                                />
                                <Text style={tw`mt-2 mr-2`}>Natural</Text>
                                <RadioButton
                                color="#050C9C"
                                value="contacts"
                                status={eyeColor === 'contacts' ? 'checked' : 'unchecked'}
                                onPress={() => setEyeColor('contacts')}
                                />
                                <Text style={tw`text-xs mt-2.5`}>Contacts</Text>
                            </View>
                        </View>
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Blood Type</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Scars, Marks, and/or tattoo/es</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Prosthetics and/or Implants</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
                        <View style={tw`flex-row pt-4 gap-4`}>
                            <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, {backgroundColor: 'white', borderColor: '#123f7b' }]}  onPress={() => navigation.navigate("ReportAP2")}>
                                <Text style={tw`text-black text-center`}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4 border`, {backgroundColor: '#DAF5FF', borderColor: '#050C9C' }]}  onPress={() => navigation.navigate("ReportAP4")}>
                            <Text style={tw`text-[#050C9C] text-center`}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}