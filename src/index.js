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
  TouchableOpacity,
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedItem: props.defaultSelectedItem,
      selectedItems: props.defaultSelectedItems,
      tempSelectedItems: [],
      scrollOffset: null,
    };
    this.scrollViewRef = React.createRef();
  }

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = (p) => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };

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
    const {
      renderItem,
      checkedIcon,
      unCheckedIcon,
      listItemTitleTextStyle,
      listItemSubtitleTextStyle,
    } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this._renderSearchInput()}
        <ScrollView
          ref={this.scrollViewRef}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={16}
        >
          <View>
            {items.map((item) =>
              renderItem(
                item,
                () => {
                  this.setModalVisible(false);
                  this.setState({
                    selectedItem: item.key,
                  });
                  if (onSubmit) {
                    onSubmit(item.key);
                  }
                },
                item.key === this.state.selectedItem,
                checkedIcon,
                unCheckedIcon,
                listItemTitleTextStyle,
                listItemSubtitleTextStyle
              )
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  _renderMultiSelectItems = (items, onSubmit) => {
    const {
      renderItem,
      checkedIcon,
      unCheckedIcon,
      listItemTitleTextStyle,
      listItemSubtitleTextStyle,
    } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this._renderSearchInput()}
        <ScrollView
          ref={this.scrollViewRef}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={16}
        >
          {items.map((item) =>
            renderItem(
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
              ),
              checkedIcon,
              unCheckedIcon,
              listItemTitleTextStyle,
              listItemSubtitleTextStyle
            )
          )}
        </ScrollView>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={"#182833"}
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
    const {
      renderSearchInput,
      enableSearch,
      searchInputPlaceholderText,
    } = this.props;
    if (enableSearch) {
      return renderSearchInput(
        this.state.searchText,
        searchInputPlaceholderText,
        (searchText) => {
          this.setState({
            searchText,
          });
        }
      );
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
    const {
      renderSelectedItem,
      items,
      chipStyle,
      chipIconStyle,
      chipTitleTextStyle,
      chipSubTitleTextStyle,
      onSubmit,
    } = this.props;
    return selectedItems.map((key) =>
      renderSelectedItem(
        items.find((item) => item.key === key),
        () => {
          if (onSubmit) {
            onSubmit(this.state.selectedItems.filter((item) => item !== key));
          }
          this.setState({
            selectedItems: this.state.selectedItems.filter(
              (item) => item !== key
            ),
          });
        },
        chipStyle,
        chipIconStyle,
        chipTitleTextStyle,
        chipSubTitleTextStyle
      )
    );
  };

  multiSelectItems = () => {
    const {
      placeholderText,
      selectedItemsPosition,
      placeholderTextStyle,
    } = this.props;
    if (
      selectedItemsPosition === "inside" &&
      this.state.selectedItems &&
      this.state.selectedItems.length
    ) {
      return this.renderSelectItemsChip(this.state.selectedItems);
    } else {
      return <Text style={placeholderTextStyle}>{placeholderText}</Text>;
    }
  };

  _renderSelectInputText = () => {
    const { type, placeholderTextStyle } = this.props;
    switch (type) {
      case "select":
        return (
          <Text style={placeholderTextStyle}>{this.selectInputText()}</Text>
        );
      case "multi":
        return this.multiSelectItems();
      // case "tree":
      //   return this.multiSelectItems();
    }
  };

  _renderSelectInput = () => {
    const { type, inputContainerStyle, selectedItemsPosition } = this.props;
    const inputContainerBorderStyle = {
      borderBottomColor: this._getColor(),
      ...this._getLineStyleVariant(),
    };
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
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
        </TouchableOpacity>
        <View style={styles.inputBelowContainer}>
          {type === "multi" && selectedItemsPosition === "below"
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
          backgroundColor: "white",
        };
      default:
        return {
          flex: 1,
          maxHeight: windowHeight * 0.7,
          backgroundColor: "white",
        };
    }
  };

  render() {
    const { props, state, setModalVisible } = this;
    let {
      type,
      items,
      onSubmit,
      hideOnBackdropPress,
      disableAndroidBack,
      swipeToDismiss,
      modelProps,
    } = props;
    if (this.state.searchText) {
      items = items.filter(
        (item) =>
          item.title.match(new RegExp(this.state.searchText, "i")) ||
          (item.subtitle &&
            item.subtitle.match(new RegExp(this.state.searchText, "i")))
      );
    }
    if (swipeToDismiss) {
      modelProps.onSwipeComplete = () => this.setModalVisible(false);
      modelProps.swipeDirection = ["down"];
      modelProps.scrollTo = this.handleScrollTo;
      modelProps.scrollOffset = this.state.scrollOffset;
      modelProps.propagateSwipe = true;
    }
    return (
      <View>
        {this._renderSelectInput()}
        <Modal
          style={{ margin: 0, justifyContent: "flex-end" }}
          isVisible={state.modalVisible}
          onBackButtonPress={() =>
            !disableAndroidBack && setModalVisible(false)
          }
          onBackdropPress={() => hideOnBackdropPress && setModalVisible(false)}
          avoidKeyboard
          {...modelProps}
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
  defaultSelectedItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultSelectedItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  selectedItemsPosition: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  searchInputText: PropTypes.string,
  renderSelectedItem: PropTypes.func,
  inputContainerBorderStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  placeholderTextStyle: ViewPropTypes.style,
  searchPlaceholderTextStyle: ViewPropTypes.style,
  listItemTitleTextStyle: ViewPropTypes.style,
  listItemSubtitleTextStyle: ViewPropTypes.style,
  chipTitleTextStyle: ViewPropTypes.style,
  chipSubTitleTextStyle: ViewPropTypes.style,
};

index.defaultProps = {
  type: "select",
  defaultSelectedItems: [],
  placeholderText: "Select Item",
  enableSearch: false,
  hideOnBackdropPress: false,
  disableAndroidBack: false,
  swipeToDismiss: false,
  modelProps: {},
  searchInputPlaceholderText: "Search...",
  errorColor: "rgb(213, 0, 0)",
  tintColor: "rgb(0, 145, 234)",
  baseColor: "rgba(0, 0, 0, .38)",
  selectedItemsPosition: "inside",
  renderSearchInput: (value, placeholder, onChange) => (
    <View style={styles.searchInputView}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  ),
  renderItem: (
    item,
    onPress,
    isSelected = false,
    checkedIcon,
    unCheckedIcon,
    listItemTitleTextStyle,
    listItemSubtitleTextStyle
  ) => (
    <TouchableHighlight
      underlayColor="#f2f2f2"
      key={item.key}
      onPress={onPress}
    >
      <View style={styles.itemMainView}>
        <View>{isSelected ? checkedIcon : unCheckedIcon}</View>
        <View style={styles.itemContentView}>
          <Text style={[styles.itemTitleTextStyle, listItemTitleTextStyle]}>
            {item.title}
          </Text>
          {item.subtitle ? (
            <Text
              style={[styles.itemSubtitleTextStyle, listItemSubtitleTextStyle]}
            >
              {item.subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableHighlight>
  ),
  renderSelectedItem: (
    item,
    onClose,
    style,
    iconStyle,
    titleTextStyle,
    subTitleTextStyle
  ) => (
    <Chip
      key={item.key}
      iconStyle={iconStyle}
      onClose={onClose}
      text={item.title}
      textStyle={titleTextStyle}
      subtitle={item.subtitle}
      subtitleStyle={subTitleTextStyle}
      style={style}
    />
  ),
  checkedIcon: <Icon name={"check-circle"} size={30} />,
  unCheckedIcon: <Icon name={"check-circle-outline"} size={30} />,
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
    paddingHorizontal: 10,
    justifyContent: "center",
    height: 50,
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
  itemContentView: {
    marginLeft: 10,
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
