import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import UserReportsNavBar from '@components/UserReportsNavBar'; // Ensure this path is correct
import {getSightingsByUser } from '@redux/actions/sightingActions'; // Ensure this action is defined

export default function MySightings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { sightings, loading, error } = useSelector((state) => state.sighting);
  const userId = useSelector((state) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getSightingsByUser());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const filteredSightings = sightings ? sightings.filter((sighting) => {
    const { firstname } = sighting.report.missingPerson.firstname;
    const { lastname } = sighting.report.missingPerson.lastname;
    const fullName = `${firstname} ${lastname}`.toLowerCase();
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  }) : [];

  return (
    <View>
      <UserReportsNavBar navigation={navigation} />

      {/* Search bar */}
      <View style={tw`px-4 pt-2 bg-transparent shadow-md z-10`}>
        <TextInput
          style={tw`bg-white border p-2 rounded-full shadow-md`}
          placeholder="Search for a sighting..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView contentContainerStyle={tw`pt-16 p-4`}>
        {filteredSightings.length === 0 ? (
          <Text style={tw`text-base text-center`}>No Sightings have been made</Text>
        ) : (
          filteredSightings.map((sighting, index) => {
            const imageSource = sighting.identificationId.image.url
              ? { uri: sighting.identificationId.image.url }
              : require('../../../assets/AGAPAYALERT.png'); // Fallback image

            const formattedDate = new Date(sighting.dateSeen).toLocaleDateString('en-US', {
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
                  <Image source={imageSource} style={tw`overflow-hidden w-30 h-full rounded-l-md`} resizeMode="contain" />
                </View>
                <View style={tw`flex-1 pl-4`}>
                  <Text style={[tw`text-base font-bold mb-1 mt-1 flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>{sighting.report.missingPerson.firstname} {sighting.report.missingPerson.lastname}</Text>
                  <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>Date Seen: {formattedDate}</Text>
                  <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>Location: {sighting.locationSeen}</Text>
                  <Text style={[tw`text-xs flex-shrink`, { color: index % 2 === 0 ? '#374151' : 'white' }]}>Status: {sighting.status}</Text>
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