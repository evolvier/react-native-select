import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeSelect from "@evolvier/react-native-select";

const data = [
  {
    key: "item1",
    title: "T-Shirt",
    subtitle: "Men>Topwear",
  },
  {
    key: "item2",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item3",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item4",
    title: "Ethnic",
  },
  {
    key: "item5",
    title: "Ethnic",
  },
  {
    key: "item6",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item7",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item8",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item9",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item10",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item11",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item12",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item13",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item14",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
  {
    key: "item15",
    title: "Ethnic",
    subtitle: "Men>Desi>Ethnic>Topwear",
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ReactNativeSelect
        select="multi"
        type="list"
        placeholderText="Click Here"
        selectedItemsPosition="below"
        defaultSelectedItems={["item1"]}
        defaultSelectedItem="item1"
        maxSelection={5}
        items={data}
        enableSearch
        presentationStyle="fullScreen"
        hideOnBackdropPress
        // disableAndroidBack
        swipeToDismiss
        onSubmit={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: "red",
    padding: 16,
    marginTop: 40,
  },
});
