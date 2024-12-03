import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { pickImage } from '@utils/imageUpload';
import avatar from '@assets/avatar.png';
import tw from 'twrnc';
import ProgressBar from '@components/ProgressBar';
import styles from '@styles/styles';

export default function ReportAP3({ nextStep, prevStep, formData, setFieldValue, errors, touched, handleChange, handleBlur }) {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [images, setSelectedImage] = useState(formData.missingPerson.images || []);
    const [isLoading, setIsLoading] = useState(false);
    
    const relationshipOptions = [
    { label: 'Parent', value: 'Parent' },
    { label: 'Sibling', value: 'Sibling' },
    { label: 'Relative', value: 'Relative' },
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Child', value: 'Child' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Colleague', value: 'Colleague' },
    { label: 'Others', value: 'Others' },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setFieldValue('missingPerson.lastSeen', currentDate);
  };
    
      const showDatepicker = () => {
        setShow(true);
      };

      const handlePickImage = async () => {
        await pickImage((uri) => {
          console.log("Selected Image", uri);
          setFieldValue('missingPerson.images', [...images, { url: uri }]);
          setSelectedImage([...images, { url: uri }]);
        }, setIsLoading);
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
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Most Recent Picture</Text>
                        <View style={tw`flex-row items-center justify-center my-2 mx-30 rounded-full border-2`}>
                        {images.length > 0 ? (
                            images.filter(image => image.url).map((image, index) => (
                            <Image key={index} source={{ uri: image.url }} style={tw`w-21 h-21 rounded-full`} />
                            ))
                        ) : (
                            <Image source={require('@assets/avatar.png')} style={tw`w-20 h-20`} />
                        )}
                        </View>
                        <TouchableOpacity onPress={handlePickImage} style={tw`bg-blue-500 p-2 rounded-md shadow-md`}>
                        <Text style={tw`text-white text-center`}>Pick an Image</Text>
                        </TouchableOpacity>
                        {touched.missingPerson?.images && errors.missingPerson?.images && <Text style={styles.errorText}>{errors.missingPerson.images}</Text>}
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Relationship</Text>
                        <View style={tw`border rounded-md shadow-md`}>
                        <RNPickerSelect
                            onValueChange={(value) => {
                                setFieldValue('missingPerson.relationship', value);
                            }}
                            items={relationshipOptions}
                            placeholder={{ label: "Select relationship", value: null }}
                            style={{
                                viewContainer: tw`bg-white p-1 rounded-md`,
                                inputAndroid: tw`bg-white rounded-md`,
                                placeholder: { color: 'gray' },
                            }}
                            />
                        </View>
                        {touched.missingPerson?.relationship && errors.missingPerson?.relationship && <Text style={styles.errorText}>{errors.missingPerson.relationship}</Text>}
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Last Known Location</Text>
                        <TextInput style={tw`bg-white border p-2 rounded-md shadow-md`} 
                        placeholder='Type here...' 
                        value={formData.missingPerson.lastKnownLocation}
                        onChangeText={handleChange("missingPerson.lastKnownLocation")}
                        onBlur={handleBlur("missingPerson.lastKnownLocation")}
                        />
                        {touched.missingPerson?.lastKnownLocation && errors.missingPerson?.lastKnownLocation && <Text style={styles.errorText}>{errors.missingPerson.lastKnownLocation}</Text>}
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Date Last Seen</Text>
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
                        {touched.missingPerson?.lastSeen && errors.missingPerson?.lastSeen && <Text style={styles.errorText}>{errors.missingPerson.lastSeen}</Text>}
                        <Text style={tw`text-base font-bold mt-3 mb-1`}>Cause of Disappearance</Text>
                        <TextInput
                            style={tw`bg-white border p-2 rounded-md shadow-md`}
                            placeholder='Type here...'
                            multiline={true}
                            numberOfLines={6}
                            textAlignVertical="top"
                            value={formData.missingPerson.causeOfDisappearance}
                            onChangeText={handleChange("missingPerson.causeOfDisappearance")}
                            onBlur={handleBlur("missingPerson.causeOfDisappearance")}
                        />
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