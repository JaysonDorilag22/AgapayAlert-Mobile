import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

export default function ReportAP2() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={tw`flex-1 pt-10`}>
      <ScrollView>
        <View>
          <View style={tw`flex-row p-4 px-4`}>
            <Text style={tw`text-xl font-bold`}>STEP 2</Text>
          </View>
          <View style={tw`flex-row px-4`}>
            <Text style={tw`text-sm ml-4`}>Input the following details about the missing person.</Text>
          </View>
          <View style={tw`items-center mb-2 pt-4`}>
            <Image source={require('../../../assets/AGAPAYALERT.png')} style={tw`w-30 h-30 rounded-full`} resizeMode="contain" />
          </View>
          <View style={tw`justify-start p-4`}>
            <Text style={tw`text-base font-bold mb-3 mb-1`}>Name</Text>
            <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
            <Text style={tw`text-base font-bold mb-3 mb-1`}>Alias or Nickname</Text>
            <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Date of birth</Text>
            <View>
              <TouchableOpacity onPress={showDatepicker} style={tw`bg-white border p-3 rounded-md shadow-md`}>
                <Text>{date.toDateString()}</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShow(Platform.OS === 'ios');
                    if (selectedDate) {
                      setDate(selectedDate);
                      setShow(false);
                    }
                  }}
                />
              )}
            </View>
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Assigned Sex at Birth</Text>
            <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Gender Identity</Text>
            <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Race or Nationality</Text>
            <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Height</Text>
            <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Weight</Text>
            <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
            <View style={tw`pt-4`}>
              <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4`, { backgroundColor: '#123f7b' }]} onPress={() => navigation.navigate("Home")}>
                <Text style={tw`text-white text-center`}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}