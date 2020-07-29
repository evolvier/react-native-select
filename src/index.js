/**
 * Copyright (c) 2019-present, Evolvier Technologies. All rights reserved.
 *
 */

"use strict";

import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ViewPropTypes,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

import Chip from "./chip";
// import Tree from './tree';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    this.state.tempSelectedItems = JSON.parse(
      JSON.stringify(this.state.selectedItems)
    );
    this.setState({ modalVisible: visible });
  };

  _renderSingleSelectItems = (items, onSubmit) => {
    const { renderSelectItems } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this._renderSearchInput()}
        <ScrollView>
          <View>
            {items.map((item) =>
              renderSelectItems(item, () => {
                this.setModalVisible(false);
                this.setState({
                  selectedItem: item.key,
                });
                if (onSubmit) {
                  onSubmit(item.key);
                }
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  _renderMultiSelectItems = (items, onSubmit) => {
    const { renderSelectItems } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this._renderSearchInput()}
        <ScrollView>
          {items.map((item) =>
            renderSelectItems(
              item,
              () => {
                let tempSelectedItems = this.state.tempSelectedItems;
                if (tempSelectedItems.find((rawItem) => rawItem === item.key)) {
                  tempSelectedItems = tempSelectedItems.filter(
                    (rawItem) => rawItem !== item.key
                  );
                } else {
                  tempSelectedItems.push(item.key);
                }
                this.setState({
                  tempSelectedItems,
                });
              },
              this.state.tempSelectedItems.find(
                (rawItem) => rawItem === item.key
              )
            )
          )}
        </ScrollView>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#243746" }}
          onPress={() => {
            this.setState({
              selectedItems: this.state.tempSelectedItems,
            });
            if (onSubmit) {
              onSubmit(this.state.tempSelectedItems);
            }
            this.setModalVisible(false);
          }}
        >
          <Text style={styles.textStyle}>DONE</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  };

  _renderSearchInput = () => {
    const { renderSearchInput, enableSearch, searchInputPlaceholderText } = this.props;
    if (enableSearch) {
      return renderSearchInput(this.state.searchText, searchInputPlaceholderText, (searchText) => {
        this.setState({
          searchText
        });
      });
    } else {
      return null;
    }
  };

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
    } else if (
      this.state.selectedItem &&
      items.find((item) => item.key === this.state.selectedItem)
    ) {
      return items.find((item) => item.key === this.state.selectedItem).title;
    } else {
      return placeholderText;
    }
  };

  renderSelectItemsChip = (selectedItems) => {
    const { renderChip, items, chipStyle, chipIconStyle } = this.props;
    return selectedItems.map((key) =>
      renderChip(
        items.find((item) => item.key === key),
        () => {
          this.setState({
            selectedItems: this.state.selectedItems.filter(
              (item) => item !== key
            ),
          });
        },
        chipStyle,
        chipIconStyle
      )
    );
  };

  multiSelectItems = () => {
    const { placeholderText, selectItemsPosition } = this.props;
    if (
      selectItemsPosition === "inside" &&
      this.state.selectedItems &&
      this.state.selectedItems.length
    ) {
      return this.renderSelectItemsChip(this.state.selectedItems);
    } else {
      return <Text>{placeholderText}</Text>;
    }
  };

  _renderSelectInputText = () => {
    const { type } = this.props;
    switch (type) {
      case "select":
        return <Text>{this.selectInputText()}</Text>;
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
      ...this._getLineStyleVariant(),
    };
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <View>
            <View
              style={[
                styles.inputContainer,
                inputContainerBorderStyle,
                inputContainerStyle,
              ]}
            >
              {this._renderSelectInputText()}
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.inputBelowContainer}>
          {type === "multi" && selectItemsPosition === "below"
            ? this.renderSelectItemsChip(this.state.selectedItems)
            : null}
        </View>
      </View>
    );
  };

  getContainerStyle = () => {
    const { presentationStyle } = this.props;
    switch (presentationStyle) {
      case "fullScreen":
        return {
          flex: 1,
          backgroundColor: "white"
        };
      default:
        return {
          flex: 1,
          position: 'absolute',
          width: windowWidth,
          maxHeight: windowHeight * 0.7,
          backgroundColor: "white"
        };
    }
  }

  render() {
    const { props, state, setModalVisible } = this;
    let { type, items, onSubmit, hideOnBackdropPress } = props;
    if (this.state.searchText) {
      items = items.filter(item => item.title.match(new RegExp(this.state.searchText, "i")) || (
        item.subtitle && item.subtitle.match(new RegExp(this.state.searchText, "i"))
      ));
    }
    return (
      <View>
        {this._renderSelectInput()}
        <Modal
          style={{ margin: 0, justifyContent: "flex-end" }}
          isVisible={state.modalVisible}
          onBackdropPress={() => hideOnBackdropPress && setModalVisible(false)}
          avoidKeyboard
        >
          <View style={this.getContainerStyle()}>
            {this._renderItems(type, items, onSubmit)}
          </View>
        </Modal>
      </View>
    );
  }
}

index.propTypes = {
  type: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      disabled: PropTypes.bool,
      children: PropTypes.array,
    })
  ).isRequired,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
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
  enableSearch: false,
  hideOnBackdropPress: false,
  searchInputPlaceholderText: "Search...",
  errorColor: "rgb(213, 0, 0)",
  tintColor: "rgb(0, 145, 234)",
  baseColor: "rgba(0, 0, 0, .38)",
  selectItemsPosition: "inside",
  renderSearchInput: (value, placeholder, onChange) => (
    <View style={styles.searchInputView}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  ),
  renderSelectItems: (item, onPress, isSelected = false) => (
    <TouchableHighlight
      underlayColor="#f2f2f2"
      key={item.key}
      onPress={onPress}
    >
      <View style={styles.itemMainView}>
        <View
          style={
            isSelected ? styles.selectedIconView : styles.unselectedIconView
          }
        >
          {isSelected ? (
            <Icon name={"check"} style={styles.checkIcon} size={25} />
          ) : null}
        </View>
        <View style={styles.itemContentView}>
          <Text style={styles.itemTitleTextStyle}>{item.title}</Text>
          {item.subtitle ? (
            <Text style={styles.itemSubtitleTextStyle}>{item.subtitle}</Text>
          ) : null}
        </View>
      </View>
    </TouchableHighlight>
  ),
  renderChip: (item, onClose, style, iconStyle) => (
    <Chip
      key={item.key}
      iconStyle={iconStyle}
      onClose={onClose}
      text={item.title}
      subtitle={item.subtitle}
      style={style}
    />
  ),
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputBelowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 0,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  searchInputView: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  itemMainView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  unselectedIconView: {
    borderWidth: 1,
    borderColor: "grey",
    height: 30,
    width: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedIconView: {
    height: 30,
    width: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#243746",
  },
  checkIcon: {
    color: "#FFFFFF",
  },
  itemContentView: {
    marginLeft: 15,
    justifyContent: "center",
  },
  itemTitleTextStyle: {
    fontSize: 16,
    color: "grey",
  },
  itemSubtitleTextStyle: {
    fontSize: 13,
    color: "#243746",
    fontWeight: "bold",
  },
});

export default index;
