import { useCallback } from "react";

export default class GraphData {
  constructor() {
    this._nodes = {};
    this._links = [];
  }

  addNode = (node) => {
    this._nodes[node.id] = this._nodes[node.id] || { ...node, links: {} };
  };

  addLink = (fromNode, toNode) => {
    this._nodes[fromNode].hasLink = true;
    this._nodes[fromNode].links[toNode] = {
      id: toNode,
      target: true,
    };
    this._nodes[toNode].hasLink = true;
    this._nodes[toNode].links[fromNode] = {
      id: fromNode,
      target: false,
    };
    this._links.push({
      source: this._nodes[fromNode],
      target: this._nodes[toNode],
    });
  };
}

export const paginateArray = function (arr, pageSize=20) {
  let newArr = [];
  let prev = 0;
  for (let i = pageSize; i <= arr.length; i += pageSize) {
    newArr.push(arr.slice(prev, i));
    prev = i;
  }
  if (arr[prev - 1] !== arr[arr.length - 1]) {
    console.log("triggered");
    console.log(arr[prev - 1], arr[arr.length - 1]);
    newArr.push(arr.slice(prev, arr.length));
  }
  return newArr;
};

const zip = function(arr1, arr2, callback) {
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    callback(arr1[i], arr2[i])
  }
}

export const compareNodes = (activeNode, selectedNodes=[], graphData) => {
  let primaryNode = {...activeNode};
  if (activeNode && !selectedNodes.length) {
    primaryNode.display_observed_genotype = [];
    primaryNode.observed_genotype.forEach((alleleObject) => {
      primaryNode.display_observed_genotype.push(alleleObject.genotype)
    })
    primaryNode.display_observed_genotype = paginateArray(primaryNode.display_observed_genotype)
    return {primary: primaryNode, secondary: null}
  } else if (!activeNode && selectedNodes.length) {
    let secondaries = selectedNodes.map((id) => {
      let node = graphData._nodes[id];
      node.display_observed_genotype = [];
      node.observed_genotype.forEach((alleleObject) => {
        let newAlleles = alleleObject.genotype.replaceAll('1', '2')
        node.display_observed_genotype.push(newAlleles);
      })
      node.display_observed_genotype = paginateArray(node.display_observed_genotype)
      return node;
    })
    return {primary: null, secondary: secondaries}
  }
}