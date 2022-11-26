import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


interface DrawerProps {}

const TestContainer = (props: DrawerProps) => {
  return (
    <View style={styles.container}>
      <Text>Drawer</Text>      
    </View>
  );
};

export default TestContainer;

const styles = StyleSheet.create({
  container: {backgroundColor:"white"}
});
