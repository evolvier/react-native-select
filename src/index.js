/**
 * Copyright (c) 2019-present, Evolvier Technologies. All rights reserved.
 *
 */

"use strict";

import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

export class index extends Component {
	render() {
		const { searchInputPlaceholderText } = this.props;
		return (
			<View>
				<TextInput placeholder={searchInputPlaceholderText}/>
				<Text> react native select </Text>
			</View>
		)
	}
}

index.propTypes = {
  searchInputPlaceholderText: PropTypes.String
};

index.defaultProps = {
  searchInputPlaceholderText: "Search Item"
};

export default index;
