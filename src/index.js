/**
 * Copyright (c) 2019-present, Evolvier Technologies. All rights reserved.
 *
 */

"use strict";

import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from "react-native";
import Modal from 'react-native-modal';
import PropTypes from "prop-types";

export class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedItem: props.selectedItem,
      selectedItems: props.selectedItems,
    };
  }

  _getColor = () => {
    const { errorColor, tintColor, baseColor, error } = this.props;
    const { hasFocus } = this.state;

    if (error) {
      return errorColor;
    }
    if (hasFocus) {
      return tintColor;
    }
    return baseColor;
  };

  _getLineStyleVariant = () => {
    const { error } = this.props;
    const { hasFocus } = this.state;

    return error || hasFocus
      ? { borderBottomWidth: 2, paddingBottom: 1 }
      : { borderBottomWidth: 0.5, paddingBottom: 2.5 };
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  _renderSingleSelectItems = (items, onSubmit) => {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            {items.map(item => (
              <TouchableHighlight key={item.key} onPress={() => {
                this.setModalVisible(false);
                this.setState({
                  selectedItem: item.key
                });
                if (onSubmit) {
                  onSubmit(item.key);
                }
              }}>
                <Text>{item.label}</Text>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  _renderItems = (type, items, onSubmit) => {
    switch (type) {
      case "select":
        return this._renderSingleSelectItems(items, onSubmit);
    }
  };

  searchItemTextSelect = () => {
    const { searchInputPlaceholderText, searchInputText, items } = this.props;
    if (searchInputText) {
      return searchInputText;
    } else if (this.state.selectedItem && items.find(item => item.key === this.state.selectedItem)) {
      return items.find(item => item.key === this.state.selectedItem).label;
    } else {
      return searchInputPlaceholderText;
    }
  };

  _renderSearchItemText = () => {
    const { type } = this.props;
    switch (type) {
      case "select":
        return this.searchItemTextSelect();
    }
  };

  _renderSearchBox = () => {
    const { inputContainerStyle } = this.props;
    const inputContainerBorderStyle = {
      borderBottomColor: this._getColor(),
      ...this._getLineStyleVariant()
    };
    return (
      <TouchableHighlight
        onPress={() => {
          this.setModalVisible(true);
        }}
      >
        <View style={[
          styles.inputContainer,
          inputContainerBorderStyle,
          inputContainerStyle
        ]}>
          <Text>{this._renderSearchItemText()}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { props, state } = this;
    const { type, items, onSubmit } = props;
    return (
      <View>
        {this._renderSearchBox()}
        <Modal
          style={{ margin: 0, justifyContent: 'flex-end' }}
          isVisible={state.modalVisible}
        >
          <View style={{ backgroundColor: 'white' }}>
            {this._renderItems(type, items, onSubmit)}
          </View>

        </Modal>
      </View>
    );
  }
}

index.propTypes = {
  type: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.array,
  })).isRequired,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedItems: PropTypes.array,
  onSubmit: PropTypes.func,
  searchInputPlaceholderText: PropTypes.string,
  searchInputText: PropTypes.string,
};

index.defaultProps = {
  type: "select",
  searchInputPlaceholderText: "Select Item",
  errorColor: 'rgb(213, 0, 0)',
  tintColor: 'rgb(0, 145, 234)',
  baseColor: 'rgba(0, 0, 0, .38)',
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default index;
