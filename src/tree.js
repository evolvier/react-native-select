/**
 * Copyright (c) 2019-present, Evolvier Technologies. All rights reserved.
 *
 */

"use strict";

import React, { Component } from 'react';

import TreeNode from "./treeNode";

export class Tree extends Component {

  renderNode(nodeData) {
    const { onlyCheckLeaf, multiple } = this.props;
    const { expandedMap, selectedKeysMap } = this.state;
    const { key } = nodeData;
    const predecessorsCount = this.predecessorsOfNodeMap[key].length;

    return (
      <TreeNode
        onExpand={this.onExpand}
        onSelect={this.onSelect}
        predecessorsCount={predecessorsCount}
        check={selectedKeysMap[key]}
        onlyCheckLeaf={onlyCheckLeaf}
        multiple={multiple}
        expanded={expandedMap[key]}
        nodeData={nodeData} />
    );
  }

  render() {
    return this.renderNode({});
  }
}

export default Tree;
