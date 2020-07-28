/**
 * Copyright (c) 2019-present, Evolvier Technologies. All rights reserved.
 *
 */

"use strict";

import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

export class index extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  render() {
    const { props, setModalVisible, state } = this;
    const { searchInputPlaceholderText } = props;
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Click Me</Text>
        </TouchableHighlight>
        <Text> react native select </Text>

        <Modal
          animationType="slide"
          transparent={true}
		  visible={state.modalVisible}
		  presentationStyle={'fullScreen'}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

index.propTypes = {
  searchInputPlaceholderText: PropTypes.String,
};

index.defaultProps = {
  searchInputPlaceholderText: "Search Item",
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
	flex: 1,
    // margin: 20,
    backgroundColor: "red",
    // borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default index;
