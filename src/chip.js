/**
 * Copyright (c) 2019-present, Evolvier Technologies. All rights reserved.
 *
 */

"use strict";

import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

export default class Chip extends React.PureComponent {
  static defaultProps = {
    onClose: () => {},
    text: "",
  };

  constructor(props) {
    super(props);
    this.isIOS = Platform.OS === "ios";
  }

  render() {
    const {
      iconStyle,
      onClose,
      style,
      text,
      textStyle,
      subtitle,
      subtitleStyle,
    } = this.props;

    return (
      <View style={[styles.root, style]}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {text ? (
              <Text style={[styles.text, textStyle]} numberOfLines={1}>
                {text}
              </Text>
            ) : null}
            {subtitle ? (
              <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={[styles.iconWrapper, iconStyle]}
            onPress={onClose}
          >
            <Text
              style={[
                styles.icon,
                this.isIOS ? styles.iconIOS : styles.iconAndroid,
              ]}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 5,
    marginBottom: 5,
    marginRight: 5,
  },
  container: {
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: "center",
    maxWidth: width - 100,
  },
  text: {
    color: "grey",
    fontSize: 14,
  },
  subtitle: {
    color: "#243746",
    fontSize: 12,
    fontWeight: "bold",
  },
  iconWrapper: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 25,
    width: 25,
    overflow: "hidden",
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textAlign: "center",
    color: "red",
  },
  iconIOS: {
    fontSize: 14,
  },
  iconAndroid: {
    fontSize: 13,
    lineHeight: 15,
  },
});
