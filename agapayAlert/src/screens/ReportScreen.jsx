// ReportScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@styles/styles';
import tw from 'twrnc';
import NavigationBar from '@components/NavigationBar'; // Ensure this path is correct
import { getReports } from '@redux/actions/reportActions';

export default function ReportScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.report);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const filteredReports = reports ? reports.filter((report) => {
    const { firstname, lastname } = report.missingPerson;
    const fullName = `${firstname} ${lastname}`.toLowerCase();
    return report.status === "Confirmed" && fullName.includes(searchQuery.toLowerCase());
  }) : [];

  return (
    <View>
      <NavigationBar navigation={navigation} />

      {/* Search bar */}
      <View style={tw`px-4 pt-2 bg-transparent shadow-md z-10`}>
        <TextInput
          style={tw`bg-white border p-2 rounded-full shadow-md`}
          placeholder="Search for a person..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView contentContainerStyle={tw`pt-16 p-4`}>
        {filteredReports.map((report, index) => {

          const formattedDate = new Date(report.missingPerson.lastSeen).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ReportDetailsScreen', { report })}
              style={[
                tw`flex flex-row h-30 shadow-md rounded-lg pr-2 mb-4 bg-transparent`,
                { backgroundColor: index % 2 === 0 ? 'white' : '#123f7b' }
              ]}
            >
              <View style={tw`w-30 h-full bg-gray-200 rounded-l-md`}>
                <Image source={require('../../assets/AGAPAYALERT.png')} style={tw`overflow-hidden w-30 h-full rounded-l-md`} resizeMode="contain" />
              </View>
              <View style={tw`flex-1 pl-4`}>
                <Text style={[tw`text-base font-bold mb-1 mt-1 flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>
                  {report.missingPerson.firstname} {report.missingPerson.lastname}
                </Text>
                <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>
                  Age: {report.missingPerson.age}
                </Text>
                <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>
                  Date Last Seen: {formattedDate}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={tw`pb-50`} />
      </ScrollView>
    </View>
  );
}