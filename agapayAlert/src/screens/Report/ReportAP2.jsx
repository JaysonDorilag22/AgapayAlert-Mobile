import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'twrnc';
import ProgressBar from '@components/ProgressBar';
import styles from '@styles/styles';

export default function ReportAP2({ nextStep, prevStep, formData, errors, touched, handleChange, handleBlur, setFieldValue }) {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [lastSeenDate, setLastSeenDate] = useState(new Date());
  const [showDateOfBirthPicker, setShowDateOfBirthPickerState] = useState(false);
  const [showLastSeenPicker, setShowLastSeenPicker] = useState(false);
  const [sex, setSex] = useState(formData.missingPerson.assignedSexAtBirth || '');
  const [age, setAge] = useState(formData.missingPerson.age || '');
  const [genderIdentity, setGenderIdentity] = useState(formData.missingPerson.genderIdentity || '');
  const [selfDescribe, setSelfDescribe] = useState('');
  const sexOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  const genderOptions = [
    { label: 'Straight', value: 'straight' },
    { label: 'Trans Male', value: 'trans_male' },
    { label: 'Trans Female', value: 'trans_female' },
    { label: 'Genderqueer', value: 'genderqueer' },
    { label: 'Non-binary', value: 'non_binary' },
    { label: 'Self-describe', value: 'self_describe' },
  ];

  const onChangeDateOfBirth = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDateOfBirthPickerState(Platform.OS === 'ios');
    setDate(currentDate);
    calculateAge(currentDate);
    setFieldValue('missingPerson.dateOfBirth', currentDate.toISOString());
  };

  const onChangeLastSeen = (event, selectedDate) => {
    const currentDate = selectedDate || lastSeenDate;
    setShowLastSeenPicker(Platform.OS === 'ios');
    setLastSeenDate(currentDate);
    setFieldValue('missingPerson.lastSeen', currentDate.toISOString());
  };

  const showDateOfBirthPickerHandler = () => {
    setShowDateOfBirthPickerState(true);
  };

  const showLastSeenPickerHandler = () => {
    setShowLastSeenPicker(true);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
    setFieldValue('missingPerson.age', age);
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
          <ScrollView>
            <View style={tw`justify-start p-4`}>
              <Text style={tw`text-base font-bold mt-3 mb-1`}>First Name</Text>
              <TextInput
                style={tw`bg-white border p-2 rounded-md shadow-md`}
                placeholder="Type here..."
                value={formData.missingPerson.firstname}
                onChangeText={handleChange("missingPerson.firstname")}
                onBlur={handleBlur("missingPerson.firstname")}
              />
              {touched.missingPerson?.firstname && errors.missingPerson?.firstname && <Text style={styles.errorText}>{errors.missingPerson.firstname}</Text>}
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Name</Text>
              <TextInput
                style={tw`bg-white border p-2 rounded-md shadow-md`}
                placeholder='Type here...'
                value={formData.missingPerson.lastname}
                onChangeText={handleChange("missingPerson.lastname")}
                onBlur={handleBlur("missingPerson.lastname")}
              />
              {touched.missingPerson?.lastname && errors.missingPerson?.lastname && <Text style={styles.errorText}>{errors.missingPerson.lastname}</Text>}
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Alias or Nickname</Text>
              <TextInput
                style={tw`bg-white border p-2 rounded-md shadow-md`}
                placeholder='Type here...'
                value={formData.missingPerson.alias}
                onChangeText={handleChange("missingPerson.alias")}
                onBlur={handleBlur("missingPerson.alias")}
              />
              <View style={tw`flex-row flex-nowrap`}>
                <Text style={tw`text-base font-bold mt-3 mb-1 mr-21`}>Date of birth</Text>
                <Text style={tw`text-base font-bold mt-3 mb-1`}>Age</Text>
              </View>
              <View style={tw`flex-row flex-nowrap`}>
                <View style={tw`flex-nowrap mr-7`}>
                  <TouchableOpacity onPress={showDateOfBirthPickerHandler} style={tw`bg-white border p-3 rounded-md shadow-md pr-8 grow-0 shrink-0`}>
                    <Text>
                      {date.toDateString()}
                      </Text>
                  </TouchableOpacity>
                  {showDateOfBirthPicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      display="default"
                      maximumDate={new Date()}
                      onChange={onChangeDateOfBirth}
                    />
                  )}
                </View>
                <View>
                  <TextInput
                    style={tw`bg-white border p-2 pr-10 rounded-md shadow-md`}
                    value={age.toString()}
                    editable={false}
                  />
                </View>
              </View>
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Seen</Text>
              <View style={tw`flex-nowrap mr-7`}>
                <TouchableOpacity onPress={showLastSeenPickerHandler} style={tw`bg-white border p-3 rounded-md shadow-md pr-8 grow-0 shrink-0`}>
                  <Text>
                    {lastSeenDate.toDateString()}
                  </Text>
                </TouchableOpacity>
                {showLastSeenPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={lastSeenDate}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={onChangeLastSeen}
                  />
                )}
              </View>
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Assigned Sex at Birth</Text>
              <View style={tw`border rounded-md shadow-md`}>
                <RNPickerSelect
                  onValueChange={(value) => {
                    setSex(value);
                    setFieldValue('missingPerson.assignedSexAtBirth', value);
                  }}
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
              {touched.missingPerson?.assignedSexAtBirth && errors.missingPerson?.assignedSexAtBirth && <Text style={styles.errorText}>{errors.missingPerson.assignedSexAtBirth}</Text>}
              <Text style={tw`text-base font-bold mt-3 mb-1`}>Gender Identity</Text>
              <View style={tw`border rounded-md shadow-md`}>
                <RNPickerSelect
                  onValueChange={(value) => {
                    setGenderIdentity(value);
                    setFieldValue('missingPerson.genderIdentity', value);
                  }}
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
                    onChangeText={(value) => {
                      setSelfDescribe(value);
                      setFieldValue('missingPerson.selfDescribe', value);
                    }}
                  />
                </View>
              )}
              <View style={tw`flex-row flex-nowrap`}>
                <Text style={tw`text-base font-bold mt-3 mb-1 mr-30`}>Height</Text>
                <Text style={tw`text-base font-bold mt-3 mb-1`}>Weight</Text>
              </View>
              <View style={tw`flex-row`}>
                <TextInput
                  style={tw`bg-white border p-2 px-6 rounded-md shadow-md`}
                  placeholder="Type here..."
                  value={formData.missingPerson.height}
                  onChangeText={(value) => setFieldValue("missingPerson.height", value)}
                  onBlur={handleBlur("missingPerson.height")}
                  keyboardType='numeric'
                />
                <Text style={tw`ml-2 mr-6`}>cm</Text>
                <TextInput
                  style={tw`bg-white border p-2 px-6 rounded-md shadow-md`}
                  placeholder="Type here..."
                  value={formData.missingPerson.weight}
                  onChangeText={(value) => setFieldValue("missingPerson.weight", value)}
                  onBlur={handleBlur("missingPerson.weight")}
                  keyboardType='numeric'
                />
                <Text style={tw`ml-2`}>kg</Text>
              </View>
              <View style={tw`flex-row pt-4 gap-4`}>
                <TouchableOpacity style={[tw`py-3 px-15 rounded-full mt-4 border`, { backgroundColor: 'white', borderColor: '#123f7b' }]} onPress={prevStep}>
                  <Text style={tw`text-black text-center`}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`py-3 px-13 rounded-full mt-4 border`, { backgroundColor: '#DAF5FF', borderColor: '#050C9C' }]} onPress={nextStep}>
                  <Text style={tw`text-[#050C9C] text-center`}>Proceed</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`mb-20`} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}