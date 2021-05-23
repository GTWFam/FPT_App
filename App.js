import React from 'react';
import { View, StyleSheet } from 'react-native';

import Map from "./screens/Map";
import Photos from "./screens/Photos";

export default function App() {
  return (
    <View style={styles.container}>
      <Photos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});