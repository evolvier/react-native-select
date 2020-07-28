import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeSelect from '@evolvier/react-native-select';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ReactNativeSelect
        searchInputPlaceholderText={"gggg"}
        
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: "red",
    marginTop:30
  },
});
