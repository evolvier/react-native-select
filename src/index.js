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
  ScrollView,
  ViewPropTypes,
} from "react-native";
import Modal from 'react-native-modal';
import PropTypes from "prop-types";

import Chip from './chip';
// import Tree from './tree';

export class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedItem: props.selectedItem,
      selectedItems: props.selectedItems,
      tempSelectedItems: [],
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
    this.state.tempSelectedItems = JSON.parse(JSON.stringify(this.state.selectedItems));
    this.setState({ modalVisible: visible });
  };

  _renderSingleSelectItems = (items, onSubmit) => {
    const { renderSelectItems } = this.props;
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            {items.map(item => renderSelectItems(item, () => {
              this.setModalVisible(false);
              this.setState({
                selectedItem: item.key
              });
              if (onSubmit) {
                onSubmit(item.key);
              }
            }))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  _renderMultiSelectItems = (items, onSubmit) => {
    const { renderSelectItems } = this.props;
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            {items.map(item => renderSelectItems(item, () => {
              let tempSelectedItems = this.state.tempSelectedItems;
              if (tempSelectedItems.find(rawItem => rawItem === item.key)) {
                tempSelectedItems = tempSelectedItems.filter(rawItem => rawItem !== item.key);
              } else {
                tempSelectedItems.push(item.key);
              }
              this.setState({
                tempSelectedItems
              });
            }, this.state.tempSelectedItems.find(rawItem => rawItem === item.key)))}
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setState({
                  selectedItems: this.state.tempSelectedItems
                });
                if (onSubmit) {
                  onSubmit(this.state.tempSelectedItems);
                }
                this.setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _renderItems = (type, items, onSubmit) => {
    switch (type) {
      case "select":
        return this._renderSingleSelectItems(items, onSubmit);
      case "multi":
        return this._renderMultiSelectItems(items, onSubmit);
      // case "tree":
      //   return (<Tree/>);
    }
  };

  selectInputText = () => {
    const { placeholderText, searchInputText, items } = this.props;
    if (searchInputText) {
      return searchInputText;
    } else if (this.state.selectedItem && items.find(item => item.key === this.state.selectedItem)) {
      return items.find(item => item.key === this.state.selectedItem).title;
    } else {
      return placeholderText;
    }
  };

  renderSelectItemsChip = (selectedItems) => {
    const { renderChip, items, chipStyle, chipIconStyle } = this.props;
    return selectedItems.map(key =>
      renderChip(
        items.find(item => item.key === key),
        () => {
          this.setState({
            selectedItems: this.state.selectedItems.filter(item => item !== key)
          });
        },
        chipStyle,
        chipIconStyle
      )
    );
  };

  multiSelectItems = () => {
    const { placeholderText, selectItemsPosition } = this.props;
    if (selectItemsPosition === "inside" && this.state.selectedItems && this.state.selectedItems.length) {
      return this.renderSelectItemsChip(this.state.selectedItems);
    } else {
      return (
        <Text>
          {placeholderText}
        </Text>
      );
    }
  };

  _renderSelectInputText = () => {
    const { type } = this.props;
    switch (type) {
      case "select":
        return (
          <Text>
            {this.selectInputText()}
          </Text>
        );
      case "multi":
        return this.multiSelectItems();
      // case "tree":
      //   return this.multiSelectItems();
    }
  };

  _renderSelectInput = () => {
    const { type, inputContainerStyle, selectItemsPosition } = this.props;
    const inputContainerBorderStyle = {
      borderBottomColor: this._getColor(),
      ...this._getLineStyleVariant()
    };
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <View>
            <View style={[
              styles.inputContainer,
              inputContainerBorderStyle,
              inputContainerStyle
            ]}>
              {this._renderSelectInputText()}
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.inputBelowContainer}>
          {type === "multi" && selectItemsPosition === "below" ? this.renderSelectItemsChip(this.state.selectedItems) : null}
        </View>
      </View>
    );
  };

  render() {
    const { props, state } = this;
    const { type, items, onSubmit } = props;
    return (
      <View>
        {this._renderSelectInput()}
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
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.array,
  })).isRequired,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedItems: PropTypes.array,
  onSubmit: PropTypes.func,
  placeholderText: PropTypes.string,
  searchInputText: PropTypes.string,
  renderChip: PropTypes.func,
  inputContainerBorderStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
};

index.defaultProps = {
  type: "select",
  selectedItems: [],
  placeholderText: "Select Item",
  errorColor: 'rgb(213, 0, 0)',
  tintColor: 'rgb(0, 145, 234)',
  baseColor: 'rgba(0, 0, 0, .38)',
  selectItemsPosition: "inside",
  renderSelectItems: (item, onPress, isSelected = false) => (
    <TouchableHighlight
      key={item.key}
      style={{
        backgroundColor: isSelected ? "blue" : "white"
      }}
      onPress={onPress}>
      <Text>{item.title}</Text>
    </TouchableHighlight>
  ),
  renderChip: (item, onClose, style, iconStyle) => (
    <Chip
      key={item.key}
      iconStyle={iconStyle}
      onClose={onClose}
      text={item.title}
      style={style}
    />
  )
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputBelowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default index;
