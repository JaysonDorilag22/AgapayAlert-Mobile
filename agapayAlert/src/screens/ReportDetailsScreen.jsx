//ReportDetails.jsx
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import NavigationBar from '@components/NavigationBar'; // Ensure this path is correct

export default function ReportDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { report } = route.params;
    
    const imageSource = report.images && report.images.length > 0 && report.images[0]
    ? { uri: report.images[0] }
    : require('../../assets/AGAPAYALERT.png');

    return (
        <View style={tw`pt-6`}>
             <ScrollView contentContainerStyle={tw`p-4`}>
                <View style={tw`items-center mb-4`}>
                <Image source={imageSource} style={tw`w-40 h-40 rounded-full`} resizeMode="contain" />
                </View>
                <Text style={tw`text-xl font-bold mb-2`}>{report.missingPerson.firstname} {report.missingPerson.lastname}</Text>
                <Text style={tw`text-base mb-2`}>Age: {report.missingPerson.age}</Text>
                <Text style={tw`text-base mb-2`}>Age: {report.missingPerson.lastSeen}</Text>
                <Text style={tw`text-base mb-2`}>Last Seen Wearing: {report.missingPerson.lastKnownClothing}</Text>
                <Text style={tw`text-base mb-2`}>Last Known Location: {report.missingPerson.lastKnownLocation}</Text>
            </ScrollView>
        </View>
    );
}