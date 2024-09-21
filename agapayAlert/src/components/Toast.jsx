// components/Toast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

const Toast = ({ message, type }) => {
  if (!message) return null;

  return (
    <View style={[styles.toast, type === 'error' ? styles.error : styles.success]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Toast;