# React Native Select [![npm version](https://badge.fury.io/js/%40evolvier%2Freact-native-select.svg)](https://badge.fury.io/js/%40evolvier%2Freact-native-select) [![Dependency Status](https://david-dm.org/evolvier/react-native-select.svg)](https://david-dm.org/evolvier/react-native-select)

A multi (or single) select component

## Installation

This library is available on npm, you need to have [node.js](https://nodejs.org/en/) installed.

install it with npm:

```bash
npm i --save @evolvier/react-native-select
```

Alternatively you can use [yarn](https://yarnpkg.com/lang/en/docs/install/).

```bash
yarn add @evolvier/react-native-select
```

## Usage

```jsx
import React, { Component } from "react";
import ReactNativeSelect from "@evolvier/react-native-select";

class Example extends Component {
  render() {
    let data = [
      {
        key: "10011",
        title: "William",
        subtitle: "Developer",
      },
      {
        key: "10012",
        title: "Emma",
        subtitle: "UI/UX Designer",
      },
      {
        key: "10013",
        title: "James",
      },
    ];

    return (
      <ReactNativeSelect
        items={data}
        onSubmit={(selectedItem) => console.log(selectedItem)}
      />
    );
  }
}
```

## Props

| Property                     | Type              | Default         | Description                            |
| ---------------------------- | ----------------- | --------------- | -------------------------------------- |
| `items` [`*`](#`*`)          | `Array`           |                 | Array of objects to populate the list [More info](#items) |
| `onSubmit` [`*`](#`*`)       | `Func`            |                 | Called when selectedItem(s) changes |
| `type`                       | `String`          | `select`        | Type of selection [`select` or `multi`]                          |
| `placeholderText`            | `String`          | "`Select Item`" | Select input placeholder text                                    |
| `renderItem`                 | `Func`            |                 |                                                                  |
| `selectedItemsPosition`      | `String`          | `inside`        | Position of selected items in `multi` type [`inside` or `below`] |
| `renderSelectedItem`         | `Func`            |                 |                                                                  |
| `enableSearch`               | `Boolean`         | `false`         | Enable search                                                    |
| `searchInputPlaceholderText` | `String`          | "`Search...`"   | Search box placeholder text                                      |
| `renderSearchInput`          | `Func`            |                 |                                                                  |
| `defaultSelectedItems`       | `Array`           |                 |                                                                  |
| `defaultSelectedItem`        | `String | Number` |                 |                                                                  |
| `hideOnBackdropPress`        | `Boolean`         | `false`         |                                                                  |
| `disableAndroidBack`         | `Boolean`         | `false`         |                                                                  |

###### `*` `isRequired fields`

### items

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

@evolvier/react-native-select is [MIT Licensed](LICENSE).

![image](https://www.evolvier.com/assets/images/logo-dark.png)
Copyright 2020 [Evolvier Technologies](https://www.evolvier.com). All rights reserved.
