import React from 'react';
import { View, StyleSheet } from 'react-native';
import AdminNavbar from '@components/AdminNavbar';

const withAdminNavbar = (Component) => {
  return (props) => (
    <View style={styles.container}>
      <AdminNavbar navigation={props.navigation} />
      <Component {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withAdminNavbar;