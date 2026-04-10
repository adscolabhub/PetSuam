import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default function Input({placeholder, ...props }) {
  return (
    <View style={styles.container}>
      <TextInput  style={styles.inputBox} placeholder={placeholder} {...props}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  inputBox: {
    borderBlockColor: "black",
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    width: 300
  }
  
});