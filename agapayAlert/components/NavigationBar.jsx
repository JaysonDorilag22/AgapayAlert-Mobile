// NavigationBar.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function NavigationBar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
});