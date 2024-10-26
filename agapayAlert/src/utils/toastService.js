import Toast from 'react-native-toast-message';

export const showToast = (type, text1) => {
  Toast.show({
    type,
    text1,
  });
};