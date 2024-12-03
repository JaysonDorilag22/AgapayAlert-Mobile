// utils/imagesUpload.js
import { all } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const requestMediaLibraryPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Sorry, we need camera roll permissions to make this work!');
    return false;
  }
  return true;
};

export const pickMultipleImages = async (setImages, setIsLoading) => {
  const hasPermission = await requestMediaLibraryPermissions();
  if (!hasPermission) return;

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  console.log("Image Picker Result: ", result); // Debugging log

  if (!result.canceled) {
    const newImages = result.assets.map(asset => ({
      url: {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName || asset.uri.split('/').pop(),
      },
    }));
    setIsLoading(true);
    console.log("Image URIs: ", newImages); // Debugging log
    // Simulate image upload
    setTimeout(() => {
      setImages(prevImages => [...prevImages, ...newImages]);
      setIsLoading(false);
      console.log("Upload successful, Image URIs: ", newImages); // Debugging log
    }, 2000); // Simulate a 2-second upload time
  }
};