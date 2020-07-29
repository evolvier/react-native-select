import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeSelect from '@evolvier/react-native-select';

const data = [{
  key: "item1",
  title: "Item 1"
}, {
  key: "item2",
  title: "Item 2"
}, {
  key: "item3",
  title: "Item 3"
}, {
  key: "item4",
  title: "Item 4"
}, {
  key: "item5",
  title: "Item 5"
}];

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar />
      <ReactNativeSelect
        type="multi"
        selectItemsPosition="inside"
        items={data}
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
    padding: 16,
    marginTop: 40
  },
});
