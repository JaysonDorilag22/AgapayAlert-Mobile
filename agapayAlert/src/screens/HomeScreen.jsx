// HomeScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '@redux/actions/userActions';
import { showToast } from '@utils/toastService';
import styles from '@styles/styles';
import tw from "twrnc";
import { Video } from 'expo-av'; 
import NavigationBar from '@components/NavigationBar'; // Ensure this path is correct

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
    showToast('success', 'Logout successful');
  }

  return (
    <View>
      <NavigationBar navigation={navigation} />
      <ScrollView>
      <View>
      <Video
            source={require('../../assets/AGAPAYALERT.mp4')} // Ensure this path is correct
            style={tw`max-w-full h-25`}
            resizeMode="cover"
            isLooping
            shouldPlay
            volume={0}
            disableFocus={true}
            controls={false}
          />
      </View>
      <View style={tw`flex-row justify-around pt-4`}>
          <Image 
              source={require('../../assets/Click.png')} 
              style={tw`w-55 h-55`} 
              resizeMode="contain"
          />
      </View>
      <View style={tw`flex-row justify-around p-4`}>
        <Text style={tw`text-gray-700 text-center`}>Report missing persons here and help us bring them home by clicking the button below.</Text>
      </View>
      <View style={tw`flex-row justify-around pt-15`}>
        <TouchableOpacity style={[tw` p-6 px-20 rounded-full shadow-lg`, { backgroundColor: '#123f7b' }]} onPress={() => navigation.navigate('Report')}>
          <Text style={tw`text-white text-center`}>Seek Now</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`pt-30`}>
        <View style={tw`p-2`}>
          <Text style={tw`text-xl font-bold text-center text-gray-800 mb-4`}>About Us</Text>
          <Text style={tw`text-base text-center text-gray-700 mb-6`}>
            We are a community-driven alert system created to keep people safe by providing real-time updates on missing persons, abductions, and hit-and-run incidents. Through simple, secure technology, AgapayAlert connects the public and law enforcement, making it easier to work together in critical situations.
          </Text>
        </View>
      </View>

      <View style={tw`pb-40`}></View>

        
      </ScrollView>

    </View>
    
  );
}