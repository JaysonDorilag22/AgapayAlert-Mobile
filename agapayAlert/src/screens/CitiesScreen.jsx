// CitiesScreen.jsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '@styles/styles';
import NavigationBar from '@components/NavigationBar'; // Ensure this path is correct

export default function CitiesScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <NavigationBar navigation={navigation}/>
      <ScrollView>
        <Text style={styles.title}>Cities Page</Text>
      </ScrollView>
    </View>
  );
}