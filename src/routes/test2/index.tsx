import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface test2Props {}

const Test2 = (props: test2Props) => {
  return (
    <View style={styles.container}>
      <Text>test2</Text>
    </View>
  );
};

export default Test2;

const styles = StyleSheet.create({
  container: {}
});
