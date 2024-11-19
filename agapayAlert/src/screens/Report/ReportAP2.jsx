import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'twrnc';
import ProgressBar from '@components/ProgressBar';

export default function ReportAP2() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [age, setAge] = useState('');
  const [sex, setSex] = useState(null);
  const [genderIdentity, setGenderIdentity] = useState(null);
  const [selfDescribe, setSelfDescribe] = useState('');
  const sexOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];
  const genderOptions = [
    { label: 'Straight', value: 'straight' },
    { label: 'Trans Male', value: 'trans_male' },
    { label: 'Trans Female', value: 'trans_female' },
    { label: 'Genderqueer', value: 'genderqueer' },
    { label: 'Non-binary', value: 'non_binary' },
    { label: 'Self-describe', value: 'self_describe' },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    calculateAge(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age.toString());
  };

  return (
    <View style={tw`flex-1`}>
      <ProgressBar step={2} totalSteps={5} />
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={tw`flex-1`}>
      <View>
          <Text style={tw`font-bold text-22px mb-1 text-center`}>Absent Person's Information</Text>
        </View>
        <View>
          <View style={tw`flex-row px-4`}>
            <Text style={tw`text-sm ml-4 text-center`}>Input the following details about the missing person.</Text>
          </View>
          <ScrollView>
            <View style={tw`justify-start p-4`}>
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Name</Text>
              <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Alias or Nickname</Text>
              <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} placeholder='Type here...' />
              
              <View style={tw`flex-row flex-nowrap`}>
                <Text style={tw`text-base font-bold mt-3 mb-1 mr-21`}>Date of birth</Text>
                <Text style={tw`text-base font-bold mt-3 mb-1`}>Age</Text>
              </View>
              <View style={tw`flex-row flex-nowrap`}>
                <View style={tw`flex-nowrap mr-7`}>
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
                </View>
                  <View >
                    <TextInput style={tw`bg-white border p-2 pr-10 rounded-md shadow-md`} readOnly value={age} />
                  </View>
              </View>
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Assigned Sex at Birth</Text>
              <View style={tw`border rounded-md shadow-md`}>
              <RNPickerSelect
              onValueChange={(value) => setSex(value)}
              items={sexOptions}
              placeholder={{ label: "Select sex", value: null }}
              style={{
                viewContainer: tw`bg-white p-1 rounded-md`,
                inputAndroid: tw`bg-white rounded-md`,
                placeholder: { color: 'gray' },
              }}
              value={sex}
            />
            </View>
            <Text style={tw`text-base font-bold mt-3 mb-1`}>Gender Identity</Text>
            <View style={tw`border rounded-md shadow-md`}>
              <RNPickerSelect
                onValueChange={(value) => setGenderIdentity(value)}
                items={genderOptions}
                placeholder={{ label: "Select gender identity", value: null }}
                style={{
                  viewContainer: tw`bg-white p-1 rounded-md`,
                  inputAndroid: tw`bg-white rounded-md`,
                  placeholder: { color: 'gray' },
                }}
                value={genderIdentity}
              />
            </View>
            {genderIdentity === 'self_describe' && (
              <View style={tw`mt-3`}>
                <TextInput
                  style={tw`bg-white border p-2 rounded-md shadow-md`}
                  placeholder='Describe your gender'
                  value={selfDescribe}
                  onChangeText={setSelfDescribe}
                />
              </View>
            )}
              <View style={tw`flex-row flex-nowrap`}>
                <Text style={tw`text-base font-bold mt-3 mb-1 mr-30`}>Height</Text>
                <Text style={tw`text-base font-bold mt-3 mb-1`}>Weight</Text>
              </View>
              <View style={tw`flex-row`}>
                <TextInput style={tw`bg-white border p-2 px-6 rounded-md shadow-md`} placeholder='Type here...' keyboardType='numeric' />
                <Text style={tw`ml-2 mr-6`}>cm</Text>
                <TextInput style={tw`bg-white border p-2 px-6 rounded-md shadow-md`} placeholder='Type here...' keyboardType='numeric' />
                <Text style={tw`ml-2`}>kg</Text>
              </View>
              <View style={tw`flex-row pt-4 gap-4`}>
              <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, {backgroundColor: 'white', borderColor: '#123f7b' }]}  onPress={() => navigation.navigate("ReportAP")}>
                  <Text style={tw`text-black text-center`}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4`, {backgroundColor: '#123f7b' }]}  onPress={() => navigation.navigate("ReportAP3")}>
                  <Text style={tw`text-white text-center`}>Proceed</Text>
              </TouchableOpacity>
              </View>
            </View>
            <View style={tw`mb-20`}/>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}