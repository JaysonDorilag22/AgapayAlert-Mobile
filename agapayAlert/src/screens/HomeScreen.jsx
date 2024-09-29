// HomeScreen.js
import NavigationBar from '@components/NavigationBar';
import styles from '@styles/styles';
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textWhite}>Welcome to the Home Screen hello</Text>
      <NavigationBar/>
    </View>
  );
}