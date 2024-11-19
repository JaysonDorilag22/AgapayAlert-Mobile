// src/components/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !roles.includes(user.role)) {
    return (
      <View>
        <Text>Unauthorized Access</Text>
      </View>
    );
  }

  return <Component {...rest} />;
};

export default PrivateRoute;