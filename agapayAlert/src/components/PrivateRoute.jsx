// src/components/PrivateRoute.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigation.navigate('Welcome');
    }
  }, [user, navigation]);

  if (!user || user.role !== 'admin') {
    return (
      <View>
        <Text>Unauthorized Access</Text>
      </View>
    );
  }

  return <Component {...rest} />;
};

export default PrivateRoute;