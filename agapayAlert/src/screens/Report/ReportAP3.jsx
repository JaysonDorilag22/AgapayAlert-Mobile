import React, {useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "@components/ProgressBar";
import tw from "twrnc";

export default function ReportAP3() {
    const navigation = useNavigation();
    
    return (
        <View style={tw`flex-1`}>
            <ProgressBar step={3} totalSteps={5} />
            <View style={tw`flex-row justify-around pt-4`}>
                <TouchableOpacity style={[tw` p-6 px-25 rounded-full shadow-lg`, { backgroundColor: '#b91c1c' }]} onPress={() => navigation.navigate("ConfirmReport")}>
                    <Text style={tw`text-white text-center`}>Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}