// HomeScreen.js
import NavigationBar from '@components/NavigationBar';
import styles from '@styles/styles';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { logout } from '@redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '@utils/toastService';
export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
    showToast('success', 'Logout successful');
    
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.buttonPrimary}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.textWhite}>Welcome to the Home Screen hello</Text>
      <NavigationBar/>
    </View>
  );
}