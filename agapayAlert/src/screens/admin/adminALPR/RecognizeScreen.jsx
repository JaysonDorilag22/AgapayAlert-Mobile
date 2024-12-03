import React, { useState } from 'react';
import { View, Text, Button, Image, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { recognizePlate } from 'src/redux/actions/alprActions';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

export default function RecognizeScreen() {
  const dispatch = useDispatch();
  const { loading, plateData, error } = useSelector((state) => state.alpr);
  const [image, setImage] = useState(null);
  const [pickingImage, setPickingImage] = useState(false);

  const pickImage = async () => {
    setPickingImage(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
    setPickingImage(false);
  };

  const handleRecognizePlate = () => {
    if (image) {
      const imageFile = {
        uri: image,
        type: 'image/jpeg',
        name: 'plate.jpg',
      };
      dispatch(recognizePlate(imageFile));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
      <TouchableOpacity onPress={pickImage} style={tw`border-dashed border-2 border-gray-400 p-10 rounded-lg mb-4`}>
        {pickingImage ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : image ? (
          <Image source={{ uri: image }} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Icon name="camera" size={50} color="gray" />
            <Text style={{ color: 'gray', marginTop: 10 }}>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      <Button title="Recognize Plate" onPress={handleRecognizePlate} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {plateData && (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Recognition Results:</Text>
          {plateData.results.map((result, index) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.resultText}>Plate: {result.plate.toUpperCase()}</Text>
              <Text style={styles.resultText}>Region: {result.region.code.toUpperCase()}</Text>
              <Text style={styles.resultText}>Score: {result.score}</Text>
              <Text style={styles.resultText}>Vehicle Type: {result.vehicle.type}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      {error && <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '90%',
    maxHeight: 300, // Set a max height to make the results scrollable
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  resultText: {
    fontSize: 16,
  },
});