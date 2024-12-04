import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import UserReportsNavBar from '@components/UserReportsNavBar'; // Ensure this path is correct
import { getReportsByUser } from '@redux/actions/reportActions'; // Ensure this action is defined

export default function MyReports() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.report);
  const userId = useSelector((state) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getReportsByUser());
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
    return fullName.includes(searchQuery.toLowerCase());
  }) : [];

  return (
    <View>
      <UserReportsNavBar navigation={navigation} />

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
        {filteredReports.length === 0 ? (
          <Text style={tw`text-base text-center`}>No Reports have been made</Text>
        ) : (
          filteredReports.map((report, index) => {
            const imageSource = report.missingPerson.images && report.missingPerson.images.length > 0 && typeof report.missingPerson.images[0] === 'string'
            ? { uri: report.missingPerson.images[0] }
            : require('../../../assets/AGAPAYALERT.png'); // Fallback image

            const formattedDate = new Date(report.missingPerson.lastSeen).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <TouchableOpacity
                key={index}
                style={[
                  tw`flex flex-row h-30 shadow-md rounded-lg pr-2 mb-4 bg-transparent`,
                  { backgroundColor: index % 2 === 0 ? 'white' : '#123f7b' }
                ]}
              >
                <View style={tw`w-30 h-full bg-gray-200 rounded-l-md`}>
                {report.images && report.images.length > 0 ? (
                      <Image
                        source={{ uri: report.images[0].url }}
                        style={tw`overflow-hidden w-30 h-full rounded-l-md`}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text style={tw`text-center p-2 w-20`}>No Image</Text>
                    )}
                </View>
                <View style={tw`flex-1 pl-4`}>
                  <Text style={[tw`text-base font-bold mb-1 mt-1 flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>{report.missingPerson.firstname} {report.missingPerson.lastname}</Text>
                  <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>Age: {report.missingPerson.age}</Text>
                  <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>Date Last Seen: {formattedDate}</Text>
                  <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>Status: {report.status}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
        <View style={tw`pb-50`} />
      </ScrollView>
    </View>
  );
}