// utils/imageUpload.js
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

export const pickImage = async (setSelectedImage, setIsLoading) => {
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
    const uri = result.assets[0].uri;
    setIsLoading(true);
    console.log("Image URI: ", uri); // Debugging log
    // Simulate image upload
    setTimeout(() => {
      setSelectedImage(uri);
      setIsLoading(false);
      console.log("Upload successful, Image URI: ", uri); // Debugging log
    }, 2000); // Simulate a 2-second upload time
  }
};